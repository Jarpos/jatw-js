"use strict";

/**
 * Changes directory
 * @param {string[]} argv Arguments
 */
function Cd(argv) {
    if (argv.length === 0) {
        cwd = fileroot;
    } else {
        const path_fragments = argv[0].split("/");
        if (path_fragments[0] === "") {
            cwd = fileroot;
            path_fragments.shift();
        }

        for (const fragment of path_fragments) {
            switch (fragment) {
                case ".": cwd = cwd; break;
                case "..": cwd = cwd.parent ? cwd.parent : cwd; break;
                case "": break;

                default: {
                    const folder = cwd.children.find(c => c.name === fragment);
                    if (folder && folder.isDir()) {
                        cwd = folder;
                    } else {
                        addLine("Error: Folder not found");
                    }
                }
            }
        }
    }
}
