/**
 * Checks whether a specified Event.Key is a letter
 * @param {string} c character to check
 * @returns Whether it's a character or not (works only on latin or latin adjacent alphabet)
 */
function isLetter(c) {
    return c.toLowerCase() !== c.toUpperCase() && c.length === 1;
}

/**
 * Gets the prompt string
 * @returns Prompt string with username and hostname
 */
function getPromptString() {
    return "<span class=\"username\">guest</span>@" +
        "<span class=\"hostname\">jatw</span>:~/$ ";
}

/**
 * Adds line at the end of the screen
 * @param  {...string} l line contents that are to be added
 */
function addLine(...l) {
    const body = document.getElementById("body");
    const ndiv = body.appendChild(document.createElement("div"));
    ndiv.innerHTML = l.join("");
}

/**
 * Updates CurrentLine variable with new line and adds it to the screen
 */
function newCurrentline() {
    currentline = document.createElement("div");
    currentline.innerHTML = getPromptString();
    body.appendChild(currentline);
}

/**
 * Gives you the current user input
 * @returns Current user input
 */
function getCurrentInput() {
    return currentline.innerHTML.slice(getPromptString().length).trim();
}

/**
 * Sets the current user input
 * @param {string} s String to set current input to
 */
 function setCurrentInput(s) {
    currentline.innerHTML = getPromptString() + s;
}
