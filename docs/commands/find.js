"use strict";

/**
 * Tries to find the file passed in argv starting from cwd
 * @param {string[]} argv Arguments
 */
function Find(argv) {
    if (argv.length === 2) {
        const files = findFiles(f => RegExp(argv[1]).exec(f.name), resolvePath(argv[0]));
        for (const file of files) {
            addLine(getPath(file));
        }
    } else {
        addLine("Usage: find [startfolder] [filename as RegExp]");
    }
}
