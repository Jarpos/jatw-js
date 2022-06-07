"use strict";

/**
 * Html Window element
 * @TODO Make more generic (maybe split into Window & Viewer class where Viewer extends Window)
 * @TODO Try to find better way to handle next & previous (controls specific to picture)
 * @TODO Rework dragging to better work with multiple windows
 * @TODO Maybe change it so the img and such has to be attached from the outside?
 * @TODO Probably rework this whole thing...
 */
class DraggableWindow extends HTMLElement {
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

        // Set up dragging
        this.setupDragging();
    }

    connectedCallback() {
        if (this.isConnected === true) {
            this.style.left = "10%";
            this.style.top = "10%";
        }
    }

    static get observedAttributes() { return ["name"]; }
    attributeChangedCallback(name, oldVal, newVal) {
        if (newVal !== oldVal) {
            switch (name) {
                case "name":
                    this.name.innerHTML = newVal;
                    this.name.appendChild(this.close);
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
        this.name.style.paddingBottom = "1%";
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
}

customElements.define("d-window", DraggableWindow);
