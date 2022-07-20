"use strict";

/**
 * Input element
 * @TODO Rework this / clean up the code
 * @TODO Add more comments/"documentation"
 * @TODO Fix caret
 */
class InputLine extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(this.getStyle());

        this.info = document.createElement("div");
        this.info.innerHTML = getPromptString();
        shadow.appendChild(this.info);

        this.userinput = document.createElement("span");
        this.info.appendChild(this.userinput);

        this.caret = document.createElement("span");
        this.caret.style.borderLeft = "10px solid";
        this.caret.setAttribute("class", "caret");
        // this.info.appendChild(this.caret);

        // Caret is implicitly on the first char of right
        /** @type string[] */ this.left = [];
        /** @type string[] */ this.right = [];

        this.Render();
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

    get Input() {
        return this.left.concat(this.right?.length > 0 ? this.right : [""]).join("");
    }
    set Input(s) { this.left = s.split(" "); this.right = []; this.Render(); }

    AddInput(input) {
        this.left.push(input);
        this.Render();
    }

    MoveCaretStart() {
        this.right = this.Input.split("");
        this.left = [];
        this.Render();
    }
    MoveCaretEnd() {
        this.left = this.Input.split("");
        this.right = [];
        this.Render();
    }

    MoveCaretRight() {
        if (this.right?.length > 0) {
            this.left.push(this.right.shift());
            this.Render();
        }
    }
    MoveCaretLeft() {
        if (this.left?.length > 0) {
            this.right.unshift(this.left.pop());
            this.Render();
        }
    }

    Backspace() { this.left = this.left.slice(0, -1); this.Render(); }
    ClearLine() { this.Input = []; this.Render(); }
    Delete() { this.right.shift(); this.Render(); }
    Deactivate() { this.Render(false); }

    Render(showcaret = true) {
        while (this.userinput.firstChild) {
            this.userinput.removeChild(this.userinput.firstChild);
        }

        // this.userinput.innerText = this.Input;
        const left = document.createElement("span");
        left.innerText = this.left.join("");
        this.userinput.append(left);

        if (showcaret) {
            const caret = document.createElement("span");
            caret.setAttribute("class", "caret");
            // caret.innerText = this.right ? this.right[0] : "";
            caret.innerText = " ";
            this.userinput.append(caret);
        }


        if (this.right?.length > 0) {
            const right = document.createElement("span");
            right.innerText = this.right.join("");
            this.userinput.append(right);
        }
    }
}

customElements.define("input-line", InputLine);
