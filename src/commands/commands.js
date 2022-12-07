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
import { Time } from "./time.js";
import { Factorize } from "./factorize.js";
import { Clear } from "./clear.js";
import { Reboot } from "./reboot.js";

/**
 * newCommand Creates a new command object for the commands map
 * @param {function (string[]): void} cmd Function to call when command is executed
 * @param {string} info Short bit of information about the command
 * @returns A command object for the commands map
 */
const nc = (cmd, info) => { return { cmd: cmd, info: info }; };

/**
 * Map containing all viable commands
 * @example
 * commands.get("help").cmd();
 * commands.get("reboot").cmd();
 */
export const commands = new Map([
    ["help", /*******/ nc(Help, /*******/ "Prints this help")],
    ["times", /******/ nc(Times, /******/ "Prints a bunch of different times")],
    ["theme", /******/ nc(Theme, /******/ "Choose theme")],
    ["viewer", /*****/ nc(Viewer, /*****/ "Opens picture viewer")],
    ["ls", /*********/ nc(Ls, /*********/ "Lists items in folder")],
    ["cd", /*********/ nc(Cd, /*********/ "Change directory")],
    ["cat", /********/ nc(Cat, /********/ "Concatenate files and print to the standard output")],
    ["tree", /*******/ nc(Tree, /*******/ "Outputs subdirectories and files as tree")],
    ["find", /*******/ nc(Find, /*******/ "Finds a file")],
    ["slisp", /******/ nc(sLisp, /******/ "Opens sLisp Interpreter")],
    ["time", /*******/ nc(Time, /*******/ "Times the given command")],
    ["factorize", /**/ nc(Factorize, /**/ "Factorizes a number")],
    ["clear", /******/ nc(Clear, /******/ "Clears terminal")],
    ["reboot", /*****/ nc(Reboot, /*****/ "Reloads terminal")],
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
