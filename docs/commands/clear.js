"use strict";

/**
 * Clears terminal
 * @param {string[]} argv Arguments
 */
function Clear(argv) {
    while (terminal().firstChild) {
        terminal().removeChild(terminal().firstChild);
    }
}
