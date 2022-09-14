"use strict";

import { fs } from "./files/files.js";
import { HandleEnter } from "./index.js";
import { getPath } from "./files/helpers.js";
import { terminal, io, allowedcharacters } from "./globals.js";

/**
 * Checks whether a specified Event.Key is a valid input character
 * @param {string} c character to check
 * @returns Whether it's a character or not
 */
export function isValidChar(c) {
    return allowedcharacters.includes(c);
}

/**
 * Gets the prompt string
 * @returns Prompt string with username and hostname
 */
export function getPromptString() {
    return "<span class=\"username\">guest</span>@" +
        `<span class=\"hostname\">jatw</span>:${getPwd()}$ `;
}

/**
 * Get the PWD string
 * @returns PrintWorkingDirectory
 */
export function getPwd() {
    return getPath(fs.cwd);
}

/**
 * Adds line at the end of the screen
 * @param  {...string} l line contents that are to be added
 * @returns The appended div
 */
export function addLine(...l) {
    // const ndiv = terminal().appendChild(document.createElement("div"));
    const ndiv = document.getElementById("terminal").appendChild(document.createElement("div"));
    ndiv.innerHTML = l.length !== 0 ? l.join("") : " ";
    return ndiv;
}

/**
 * Updates CurrentLine variable with new line and adds it to the screen
 */
export function newCurrentline() {
    if (io?.currentline) {
        io.currentline.Deactivate();
    }

    io.currentline = document.createElement("input-line");
    terminal().appendChild(io.currentline);
}

/**
 * Sets current command and executes it (also scrolls to the bottom)
 * @param {string} command Command to execute
 */
export function setAndExecuteCommand(command) {
    io.currentline.Input = command;
    HandleEnter();
    window.scrollTo(0, document.body.scrollHeight);
}

/**
 * Validates Input and returns input with only the `allowedcharacters`
 * @param {string} input Input string to validate
 * @returns Returns string with only `allowedcharacters`
 */
export function validateInput(input) {
    return input.split("").filter(e => allowedcharacters.includes(e)).join("");
}

/**
 * Compares `item` to `checkItems` and finds out if it is equal to any of them
 * @param {any} item Item that is to be checked against checkItems
 * @param {any[]} checkItems Items to which item is compared to
 * @param {function(any): any} modifier Modifies items if specified
 *
 * @example isAnyOf("--help", [ argv[0] ], (e) => e.toLowerCase())
 */
export function isAnyOf(item, checkItems, modifier = null) {
    for (const checkItem of checkItems) {
        if (item === (modifier ? modifier(checkItem) : checkItem)) {
            return true;
        }
    }
    return false;
}
