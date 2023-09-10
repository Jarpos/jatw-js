"use strict";

import { addLine } from "../helpers.js";
import { commands } from "./commands.js";

/**
 * Prints help screen
 * @param {string[]} argv Arguments
 */
export function Help(argv) {
    addLine();
    for (const [key, value] of commands.entries()) {
        addLine(`    <j-cmd cmd="${key}">${key.padEnd(15)} ${value.info}</j-cmd>`);
    }
    addLine();
    addLine(`    ${"[tab]   ".padEnd(15)} Autocompletion`);
    addLine(`    ${"[ctrl+c]".padEnd(15)} Cancel current command`);
    addLine(`    ${"[click] ".padEnd(15)} You can click on some stuff to execute/use it`);
    addLine();
}
