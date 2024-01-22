"use strict";

import { Theme } from "./commands/theme.js";
import { resetHandlers } from "./handlers.js";
import { getSuggestions } from "./commands/commands.js";
import { io, uri, body, cmdhistory } from "./globals.js";
import { printRandomLogo, printBottomInfo } from "./logos.js";
import { validateInput, newCurrentline, setAndExecuteCommand, isValidChar, addLine } from "./helpers.js";

resetHandlers();
printRandomLogo();
printBottomInfo();
newCurrentline();
uri.commands().forEach(c => setAndExecuteCommand(validateInput(c)));
if (uri.theme()) {
    Theme([uri.theme()]);
} else {
    /**
     * Check on first load if user has light mode, and if so set the theme to the
     * "light" theme, else just go with the "default" theme
     */
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
        Theme(["light"]);
    }
}

body().addEventListener("keydown", (e) => {
    if (isValidChar(e.key) && !e.ctrlKey) {
        e.preventDefault();
        io.currentline.AddInput(e.key);
    } else {
        switch (e.key) {
            case "Backspace": /***/ HandleBackspace(e); /**/ break;
            case "Enter": /*******/ HandleEnter(e); /******/ break;
            case "Tab": /*********/ HandleTab(e); /********/ break;
            case "ArrowUp": /*****/ HandleUp(e); /*********/ break;
            case "ArrowDown": /***/ HandleDown(e); /*******/ break;
            case "ArrowLeft": /***/ HandleLeft(e); /*******/ break;
            case "ArrowRight": /**/ HandleRight(e); /******/ break;
            case "Delete": /******/ HandleDelete(e); /*****/ break;
            case "c": /***********/ newCurrentline(); /****/ break;
        }
    }

    window.scrollTo(0, document.body.scrollHeight);
});

/**
 * Makes it possible for the user to paste text in from their clipboard
 */
body().addEventListener("paste", (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData || window?.Clipboard;
    io.currentline.AddInput(clipboardData.getData("Text"));
});

/**
 * Removes some or all content from current line
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
export function HandleBackspace(e) {
    e.preventDefault();
    io.currentline.Backspace(e.ctrlKey);
}

/**
 * Execute line
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
export function HandleEnter(e) {
    io.enterhandler(e);
}

/**
 * Auto complete with suggestion
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
export function HandleTab(e) {
    e.preventDefault();
    const input = io.currentline.Input;
    const suggestions = getSuggestions(input);

    if (suggestions.length === 1) {
        io.currentline.Input = suggestions[0];
    } else if (suggestions.length > 1) {
        addLine(suggestions.join("    "));
        newCurrentline();
        io.currentline.Input = input;
    }
}

/**
 * Go one command up in the input history
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
export function HandleUp(e) {
    e.preventDefault();
    cmdhistory.up();
    io.currentline.Input = cmdhistory.get();
}

/**
 * Go one command down in the input history
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
export function HandleDown(e) {
    cmdhistory.down();
    io.currentline.Input = cmdhistory.get();
}

/**
 * Go one command down in the input history
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
export function HandleLeft(e) {
    io.currentline.MoveCaretLeft(e.ctrlKey);
}

/**
 * Go one command down in the input history
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
export function HandleRight(e) {
    io.currentline.MoveCaretRight(e.ctrlKey);
}

/**
 * Go one command down in the input history
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
export function HandleDelete(e) {
    io.currentline.Delete(e.ctrlKey);
}
