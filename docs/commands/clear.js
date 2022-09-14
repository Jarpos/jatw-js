"use strict";

import { terminal } from "../globals.js";

/**
 * Clears terminal
 * @param {string[]} argv Arguments
 */
export function Clear(argv) {
    while (terminal().firstChild) {
        terminal().removeChild(terminal().firstChild);
    }
}
