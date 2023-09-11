"use strict";

import { addLine } from "../helpers.js";
import { fileroot, fs } from "../files/files.js";
import { resolvePath } from "../files/helpers.js";

/**
 * Changes directory
 * @param {string[]} argv Arguments
 */
export function Cd(argv) {
    if (argv.length === 0) {
        fs.cwd = fileroot;
    } else {
        const result = resolvePath(argv[0]);
        if (!result) {
            addLine("Error: Invalid path or could not find '", argv[0], "'");
        } else if (!result.isDir()) {
            addLine("Error: File '", result.name, "' is not a directory");
        } else {
            fs.cwd = result;
        }
    }
}
