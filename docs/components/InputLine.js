"use strict";

/**
 * Input element
 * @TODO Rework this / clean up the code
 * @TODO Add more comments/"documentation"
 */
class InputLine extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(this.getStyle());

        this.base = document.createElement("div");
        shadow.appendChild(this.base);

        this.info = document.createElement("span");
        this.info.innerHTML = inputlineinfohandler();
        this.base.appendChild(this.info);

        this.userinput = document.createElement("span");
        this.base.appendChild(this.userinput);

        this.caret = document.createElement("span");
        this.caret.style.borderLeft = "10px solid";
        this.caret.setAttribute("class", "caret");

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

    /**
     * Get the current input
     * @returns current input
     */
    get Input() {
        return this.left.concat(this.right?.length > 0 ? this.right : [""]).join("").trim();
    }

    /**
     * Set the input to the specified string
     * @param {string} s String to set the input to
     */
    set Input(s) { this.left = s.split(""); this.right = []; this.Render(); }

    /**
     * Append input to the left part of the line
     * @param {string} input Input to append to the end
     */
    AddInput(input) {
        this.left.push(input.length > 1 ? input.split("") : input);
        this.Render();
    }

    /** Moves Caret to the start of the line */
    MoveCaretStart() {
        this.right = this.Input.split("");
        this.left = [];
        this.Render();
    }

    /** Moves Caret to the end of the line */
    MoveCaretEnd() {
        this.left = this.Input.split("");
        this.right = [];
        this.Render();
    }

    /** Moves the Caret one to the left */
    MoveCaretLeft() {
        if (this.left?.length > 0) {
            this.right.unshift(this.left.pop());
            this.Render();
        }
    }

    /** Moves the Caret one to the right */
    MoveCaretRight() {
        if (this.right?.length > 0) {
            this.left.push(this.right.shift());
            this.Render();
        }
    }

    /**
     * Backspace operation (removes last character from left)
     * @param {boolean} ctrl Whether the control key was pressed
    */
    Backspace(ctrl = false) { this.left = ctrl ? [] : this.left.slice(0, -1); this.Render(); }

    /**
     * Delete operation/key (removes the first character from right)
     * @param {boolean} ctrl Whether the control key was pressed
     */
    Delete(ctrl = false) { ctrl ? this.right = [] : this.right.shift(); this.Render(); }

    /** Clear the current line */
    ClearLine() { this.Input = ""; this.Render(); }

    /** Renders the current line, but without the caret */
    Deactivate() { this.Render(false); }

    /**
     * Renders the line
     * @param {boolean} showcaret Hide or show caret (should be false if line is not currentline)
     * @TODO Rework this, to be more optimized
     */
    Render(showcaret = true) {
        while (this.userinput.firstChild) {
            this.userinput.removeChild(this.userinput.firstChild);
        }

        const left = document.createElement("span");
        left.innerText = this.left.join("");
        this.userinput.append(left);

        if (showcaret) {
            const caret = document.createElement("span");
            caret.setAttribute("class", "caret");
            caret.innerText = this.right?.length > 0 ? this.right[0] : " ";
            this.userinput.append(caret);
        }

        if (this.right?.length > 0) {
            const right = document.createElement("span");
            right.innerText = this.right.slice(showcaret ? 1 : 0).join("");
            this.userinput.append(right);
        }
    }
}

customElements.define("input-line", InputLine);
