"use strict";

import { addLine } from "../helpers.js";
import { fs } from "../files/files.js";

/**
 * Outputs subdirectories and files as tree
 * @param {string[]} argv Arguments
 */
export function Tree(argv) {
    /**
     * Traverses and prints folders and files
     * @param {Folder_c} f Folder that is currently being traversed
     * @param {number} level Current depth level
     */
    const traverse = (f, level) => {
        for (const child of f.children) {
            addLine("".padStart(level + 4), child.name);
            if (child.isDir()) {
                traverse(child, level + 4);
            }
        }
    };
    addLine(fs.cwd.name);
    traverse(fs.cwd, 0);
}
