"use strict";

/**
 * Checks whether a specified Event.Key is a valid input character
 * @param {string} c character to check
 * @returns Whether it's a character or not
 */
function isValidChar(c) {
    return allowedcharacters.includes(c);
}

/**
 * Gets the prompt string
 * @returns Prompt string with username and hostname
 */
function getPromptString() {
    return "<span class=\"username\">guest</span>@" +
        `<span class=\"hostname\">jatw</span>:${getPwd()}$ `;
}

/**
 * Get the PWD string
 * @returns PrintWorkingDirectory
 */
function getPwd() {
    return getPath(cwd);
}

/**
 * Adds line at the end of the screen
 * @param  {...string} l line contents that are to be added
 * @returns The appended div
 */
function addLine(...l) {
    const ndiv = terminal().appendChild(document.createElement("div"));
    ndiv.innerHTML = l.length !== 0 ? l.join("") : " ";
    return ndiv;
}

/**
 * Updates CurrentLine variable with new line and adds it to the screen
 */
function newCurrentline() {
    if (currentline) {
        currentline.Deactivate();
    }

    currentline = document.createElement("input-line");
    terminal().appendChild(currentline);
}

/**
 * Sets current command and executes it (also scrolls to the bottom)
 * @param {string} command Command to execute
 */
function setAndExecuteCommand(command) {
    currentline.Input = command;
    HandleEnter();
    window.scrollTo(0, document.body.scrollHeight);
}

/**
 * Validates Input and returns input with only the `allowedcharacters`
 * @param {string} input Input string to validate
 * @returns Returns string with only `allowedcharacters`
 */
function validateInput(input) {
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
function isAnyOf(item, checkItems, modifier = null) {
    for (const checkItem of checkItems) {
        if (item === (modifier ? modifier(checkItem) : checkItem)) {
            return true;
        }
    }
    return false;
}
