"use strict";

import { DraggableWindow } from "./DraggableWindow.js";

export class CanvasWindow extends DraggableWindow {
    constructor() {
        super();

        this.setupCanvas();
    }

    connectedCallback() {
        if (this.isConnected === true) {
            super.connectedCallback();
        }
    }

    static get observedAttributes() { return ["width", "height"].concat(super.observedAttributes); }
    attributeChangedCallback(name, oldVal, newVal) {
        if (newVal !== oldVal) {
            switch (name) {
                case "width":
                    this.canvas.width = +newVal;
                    break;

                case "height":
                    this.canvas.height = +newVal;
                    break;

                default:
                    super.attributeChangedCallback(name, oldVal, newVal);
                    break;
            }
        }
    }

    setupCanvas() {
        this.canvas = document.createElement("canvas");
        this.shadowRoot.appendChild(this.canvas);
    }

    /**
     * @param {string} name Name of the window
     * @param {number} width Width of the canvas
     * @param {number} height Height of the canvas
     * @returns {CanvasWindow} The window
     */
    static GetAsHtmlElement(name, width, height) {
        const window = document.createElement("c-window");
        window.setAttribute("name", name);
        window.setAttribute("width", width);
        window.setAttribute("height", height);
        return window;
    }
}

customElements.define("c-window", CanvasWindow);
