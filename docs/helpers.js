"use strict";

/**
 * Checks whether a specified Event.Key is a valid input character
 * @param {string} c character to check
 * @returns Whether it's a character or not
 */
function isLetter(c) {
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
    setCurrentInput(command);
    HandleEnter();
    window.scrollTo(0, document.body.scrollHeight);
}

/**
 * Gives you the current user input
 * @returns Current user input
 */
function getCurrentInput() {
    return currentline.Input.trim();
}

/**
 * Sets the current user input
 * @param {string} s String to set current input to
 */
function setCurrentInput(s) {
    currentline.Input = s;
}
