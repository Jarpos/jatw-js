"use strict";

class Window extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const style = document.createElement("link");
        style.setAttribute("rel", "stylesheet");
        style.setAttribute("href", "main.css");
        shadow.appendChild(style);

        // Title of the window
        this.setupWindowName();
        shadow.appendChild(this.name);

        // Close button
        this.setupCloseButton();
        this.name.appendChild(this.close);

        // Image displayed
        this.setupImage();
        shadow.appendChild(this.image);

        // Set up dragging
        this.setupDragging();
    }

    static get observedAttributes() { return ["src", "name"]; }
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
            }
        }
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
     * Setup for Window dragging
     */
    setupDragging() {
        this.isgrabbed = false;
        this.graboffset = { x: 0, y: 0 };
        this.addEventListener("mousedown", (e) => {
            this.isgrabbed = true;
            this.graboffset = {
                x: e.clientX - this.getBoundingClientRect().x,
                y: e.clientY - this.getBoundingClientRect().y,
            };
        });
        this.addEventListener("mouseup", (e) => this.isgrabbed = false);
        html().addEventListener("mousemove", (e) => {
            if (this.isgrabbed) {
                this.style.left = (e.clientX - this.graboffset.x) + "px";
                this.style.top = (e.clientY - this.graboffset.y) + "px";
            }
        });
    }
}

customElements.define("d-window", Window);
