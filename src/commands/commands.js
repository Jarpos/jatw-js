"use strict";

import { Help } from "./help.js";
import { Times } from "./times.js";
import { Theme } from "./theme.js";
import { Viewer } from "./viewer.js";
import { Ls } from "./ls.js";
import { Cd } from "./cd.js";
import { Cat } from "./cat.js";
import { Tree } from "./tree.js";
import { Find } from "./find.js";
import { sLisp } from "./slisp.js";
import { Clear } from "./clear.js";
import { Reboot } from "./reboot.js";
import { Factorize } from "./factorize.js";

/**
 * Map containing all viable commands
 * @example
 * commands.get("help").cmd();
 * commands.get("reboot").cmd();
 */
export const commands = new Map([
    ["help", /****/ { cmd: Help, /****/ info: "Prints this help", }],
    ["times", /***/ { cmd: Times, /***/ info: "Prints a bunch of different times", }],
    ["theme", /***/ { cmd: Theme, /***/ info: "Choose theme", }],
    ["viewer", /**/ { cmd: Viewer, /**/ info: "Opens picture viewer", }],
    ["ls", /******/ { cmd: Ls, /******/ info: "Lists items in folder", }],
    ["cd", /******/ { cmd: Cd, /******/ info: "Change directory", }],
    ["cat", /*****/ { cmd: Cat, /*****/ info: "Concatenate files and print on the standard output", }],
    ["tree", /****/ { cmd: Tree, /****/ info: "Outputs subdirectories and files as tree", }],
    ["find", /****/ { cmd: Find, /****/ info: "Finds a file", }],
    ["slisp", /***/ { cmd: sLisp, /***/ info: "Opens sLisp Interpreter", }],
    ["factorize", { cmd: Factorize, info: "Factorizes a number"}],
    ["clear", /***/ { cmd: Clear, /***/ info: "Clears terminal", }],
    ["reboot", /**/ { cmd: Reboot, /**/ info: "Reloads terminal", }],
]);

/**
 * Tries to find suggestion in the commands map for a given string
 * @param {string} s input string
 * @returns Possible suggestions for the given string
 */
export function getSuggestions(s) {
    let suggestions = [];
    if (s.length > 0) {
        for (const [key, value] of commands.entries()) {
            if (key.indexOf(s) === 0) {
                suggestions.push(key);
            }
        }
    }
    return suggestions;
}
