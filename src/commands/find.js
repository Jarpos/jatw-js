"use strict";

import { addLine } from "../helpers.js";
import { findFiles, resolvePath, getPath } from "../files/helpers.js";

/**
 * Tries to find the file passed in argv starting from fs.cwd
 * @param {string[]} argv Arguments
 */
export function Find(argv) {
    if (argv.length === 2) {
        const path = resolvePath(argv[0]);
        if (!path) {
            addLine("Error: Folder '", argv[0], "' not found");
            return;
        }

        const files = findFiles(f => RegExp(argv[1]).exec(f.name), path);
        for (const file of files) {
            addLine(`<j-cmd cmd="cd ${getPath(file.parent)}">`, getPath(file), "</j-cmd>");
        }
    } else {
        addLine("Usage: find [startfolder] [filename as RegExp]");
        addLine("Examples:");
        addLine("    <j-cmd>find / .txt</j-cmd>");
        addLine("    <j-cmd>find pictures/ .jpg</j-cmd>");
    }
}
