"use strict";

import { setAndExecuteCommand } from "../helpers.js";

export class Command extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (this.isConnected === true) {
            this.addEventListener("click", this.click);
        }
    }

    static get observedAttributes() { return ["cmd"]; }
    attributeChangedCallback(name, oldVal, newVal) {
        if (newVal !== oldVal) {
            switch (name) {
                case "cmd":
                    this.cmd = newVal;
                    break;
            }
        }
    }

    click() {
        if (this.cmd) {
            setAndExecuteCommand(this.cmd);
        } else {
            setAndExecuteCommand(this.innerHTML);
        }
    }

    /**
     * @param {string?} cmd Command to set and execute, if not set `innerHTML` is used
     * @returns {Command} `<j-cmd>` html element
     */
    static GetAsHtmlElement(cmd) {
        const command = document.createElement("j-cmd");
        if (cmd) {
            command.setAttribute("cmd", cmd);
        }
        return command;
    }
}

customElements.define("j-cmd", Command);
