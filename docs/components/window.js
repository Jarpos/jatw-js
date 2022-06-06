"use strict";

/**
 * Html Window element
 * @TODO Make more generic (maybe split into Window & Viewer class where Viewer extends Window)
 * @TODO Try to find better way to handle next & previous (controls specific to picture)
 * @TODO Rework dragging to better work with multiple windows
 * @TODO Maybe change it so the img and such has to be attached from the outside?
 * @TODO Probably rework this whole thing...
 */
class Window extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(this.getStyle());

        // Title of the window
        this.setupWindowName();
        shadow.appendChild(this.name);

        // Close button
        this.setupCloseButton();
        this.name.appendChild(this.close);

        // Image displayed
        this.setupImage();
        shadow.appendChild(this.image);

        // Controls
        this.setupControls();
        shadow.append(this.controls);

        // Set up dragging
        this.setupDragging();
    }

    connectedCallback() {
        if (this.isConnected === true) {
            this.style.left = "10%";
            this.style.top = "10%";
        }
    }

    static get observedAttributes() { return ["src", "name", "files"]; }
    attributeChangedCallback(name, oldVal, newVal) {
        if (newVal !== oldVal) {
            switch (name) {
                case "src":
                    this.image.src = newVal;
                    break;

                case "name":
                    this.name.innerHTML = newVal;
                    this.name.appendChild(this.close);
                    break;

                case "files":
                    this.nextPicture();
                    break;
            }
        }
    }

    /**
     * Get stylesheet link to `main.css`
     * @returns Stylesheet element
     */
    getStyle() {
        const style = document.createElement("link");
        style.setAttribute("rel", "stylesheet");
        style.setAttribute("href", "main.css");
        return style;
    }

    /**
     * Setup for Window name
     */
    setupWindowName() {
        this.name = document.createElement("div");
        this.name.innerHTML = this.getAttribute("name");
    }

    /**
     * Setup for Close button
     */
    setupCloseButton() {
        this.close = document.createElement("button");
        this.close.innerHTML = "X";
        this.close.addEventListener("click", (e) => this.remove());
        this.close.style.float = "right";
        this.close.style.border = 0;
    }

    /**
     * Setup for Image shown in the viewer
     */
    setupImage() {
        this.image = document.createElement("img");
        this.image.src = this.src;
        this.image.width = 500;
        this.image.setAttribute("draggable", "false");
        this.image.setAttribute("ondragstart", "return false;");
    }

    /**
     * Setup for the controls of the image viewer
     */
    setupControls() {
        this.i = -1;
        this.controls = document.createElement("div");

        const left = document.createElement("button");
        left.innerHTML = "<";
        left.addEventListener("click", (e) => this.prevPicture(e.shiftKey));
        left.style.float = "left";
        left.style.border = 0;

        const right = document.createElement("button");
        right.innerHTML = ">";
        right.addEventListener("click", (e) => this.nextPicture(e.shiftKey));
        right.style.float = "right";
        right.style.border = 0;

        this.controls.appendChild(left);
        this.controls.appendChild(right);
    }

    /**
     * Setup for Window dragging
     */
    setupDragging() {
        this.graboffset = null;
        this.addEventListener("mousedown", (e) => {
            this.graboffset = {
                x: e.clientX - this.getBoundingClientRect().x,
                y: e.clientY - this.getBoundingClientRect().y,
            };
        });

        this.addEventListener("mouseup", (e) => this.graboffset = null);
        html().addEventListener("mousemove", (e) => {
            if (this.graboffset) {
                this.style.left = (e.clientX - this.graboffset.x) + "px";
                this.style.top = (e.clientY - this.graboffset.y) + "px";
            }
        });
    }

    /**
     * @returns Pictures array that is in the `files` attribute
     */
    get pictures() { return JSON.parse(this.getAttribute("files")); }

    /**
     * Changes to the next picture (or the last one)
     * @param {boolean} jumpToEnd Toggle if the viewer should jump to the end
     */
    nextPicture(jumpToEnd = false) {
        if (this.i < this.pictures.length - 1) {
            this.i++;
        }
        const i = jumpToEnd ? this.pictures.length - 1 : this.i;
        this.setAttribute("src", "files/" + this.pictures[i].name);
    }

    /**
     * Changes to the previous picture (or the first one)
     * @param {boolean} jumpToStart Toggle if the viewer should jump to the start
     */
    prevPicture(jumpToStart = false) {
        if (this.i > 0) {
            this.i--;
        }
        const i = jumpToStart ? 0 : this.i;
        this.setAttribute("src", "files/" + this.pictures[i].name);
    }
}

customElements.define("d-window", Window);
