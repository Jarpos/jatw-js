"use strict";

/**
 * Clears terminal
 */
function Clear() {
    while (terminal().firstChild) {
        terminal().removeChild(terminal().firstChild);
    }
}
