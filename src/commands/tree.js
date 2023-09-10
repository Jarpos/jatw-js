"use strict";

import { fs } from "../files/files.js";
import { addLine } from "../helpers.js";
import { Folder_c } from "../files/filesystem.js";
import { getPath } from "../files/helpers.js";

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
            if (child.isDir()) {
                addLine("".padStart(level + 4), `<j-cmd cmd="cd ${getPath(child)}">`, child.name, "</j-cmd>");
                traverse(child, level + 4);
            } else {
                addLine("".padStart(level + 4), child.name);
            }
        }
    };
    addLine(`<j-cmd cmd="cd ${getPath(fs.cwd)}">${fs.cwd.name}</j-cmd>`);
    traverse(fs.cwd, 0);
}
