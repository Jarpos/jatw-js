"use strict";

/**
 * Changes directory
 * @param {string[]} argv Arguments
 */
function Cd(argv) {
    if (argv.length === 0) {
        cwd = fileroot;
    } else {
        const result = resolvePath(argv[0]);
        if (!result) {
            addLine("Error: Invalid path or could not find specified folder")
        } else if (!result.isDir()) {
            addLine("Error: File ", result.name, " is not a folder");
        } else {
            cwd = result;
        }
    }
}
