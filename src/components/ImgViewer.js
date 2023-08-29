"use strict";

import { DraggableWindow } from "./DraggableWindow.js";

/**
 * Html Image Viewer Element (extending DraggableWindow, therefore being draggable as well)
 * @TODO Rework controls and how images are saved/loaded as well as Next/Previous buttons
 */
export class ImgViewer extends DraggableWindow {
    constructor() {
        super();

        this.setupImage();
        this.setupControls();
    }

    connectedCallback() {
        if (this.isConnected === true) {
            super.connectedCallback();
        }
    }

    static get observedAttributes() { return ["src", "files", "folder",].concat(super.observedAttributes); }
    attributeChangedCallback(name, oldVal, newVal) {
        if (newVal !== oldVal) {
            switch (name) {
                case "src":
                    this.image.src = newVal;
                    break;

                case "files":
                    this.nextPicture();
                    break;

                default:
                    super.attributeChangedCallback(name, oldVal, newVal);
                    break;
            }
        }
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
        this.shadowRoot.appendChild(this.image);
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
        this.shadowRoot.append(this.controls);
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
        this.i = jumpToEnd ? this.pictures.length - 1 : this.i;
        this.setAttribute("src", this.getAttribute("folder") + this.pictures[this.i].name);
        this.setAttribute("name", "Viewer - " + this.pictures[this.i].name);
    }

    /**
     * Changes to the previous picture (or the first one)
     * @param {boolean} jumpToStart Toggle if the viewer should jump to the start
     */
    prevPicture(jumpToStart = false) {
        if (this.i > 0) {
            this.i--;
        }
        this.i = jumpToStart ? 0 : this.i;
        this.setAttribute("src", this.getAttribute("folder") + this.pictures[this.i].name);
        this.setAttribute("name", "Viewer - " + this.pictures[this.i].name);
    }

    /**
     * @param {string} name Name of window
     * @param {string} folder Location of the folder
     * @param {string[]} pictures The pictures
     * @returns {ImgViewer} The window
     */
    static GetAsHtmlElement(name, folder, pictures) {
        const window = document.createElement("d-img-viewer");
        window.setAttribute("name", name);
        window.setAttribute("folder", folder);
        window.setAttribute("files", JSON.stringify(pictures));
        return window;
    }
}

customElements.define("d-img-viewer", ImgViewer);
