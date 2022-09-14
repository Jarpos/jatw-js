"use strict";

import { addLine } from "../helpers.js";

/**
 * Reloads the site, effectively "rebooting" the terminal
 * @param {string[]} argv Arguments
 */
export function Reboot(argv) {
    location.reload();
}
