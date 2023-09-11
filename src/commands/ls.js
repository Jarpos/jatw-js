"use strict";

import { fs } from "../files/files.js";
import { addLine } from "../helpers.js";
import { resolvePath } from "../files/helpers.js";

/**
 * Lists contents of directory
 * @param {string[]} argv Arguments
 */
export function Ls(argv) {
    const folder = argv.length > 0 ? resolvePath(argv[0]) : fs.cwd;

    if (folder) {
        let listed = addLine();
        listed.innerHTML = "";
        for (let i = 0; i < folder.children.length; i++) {
            const item = document.createElement("span");
            item.innerText = folder.children[i].name + "     ";
            listed.append(item);

            if (folder.children[i].isDir()) {
                item.setAttribute("class", "ls-folder")
            } else {
                item.setAttribute("class", "ls-file")
            }

            if ((i - 4) % 5 === 0) {
                listed = addLine();
                listed.innerHTML = "";
            }
        }
    } else {
        addLine("Error: Could not find folder '", argv[0], "'");
    }
}
