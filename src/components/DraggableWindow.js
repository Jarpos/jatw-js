"use strict";

import { html } from "../globals.js";

/**
 * Html Draggable Window element
 */
export class DraggableWindow extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(this.getStyle());

        this.setupWindowName();
        this.setupCloseButton();
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
        this.shadowRoot.appendChild(this.name);
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
        this.name.appendChild(this.close);
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

        html().addEventListener("mouseup", (e) => this.graboffset = null);
        html().addEventListener("mousemove", (e) => {
            if (this.graboffset) {
                this.style.left = (e.clientX - this.graboffset.x) + "px";
                this.style.top = (e.clientY - this.graboffset.y) + "px";
            }
        });
    }

    /**
     * @param {string} name Name of window
     * @returns {DraggableWindow} The window
     */
    static GetAsHtmlElement(name) {
        const window = document.createElement("d-window");
        window.setAttribute("name", name);
        return window;
    }
}

customElements.define("d-window", DraggableWindow);
