"use strict";

/**
 * Lists contents of directory
 * @param {string[]} argv Arguments
 */
function Ls(argv) {
    let s = "";
    for (let i = 1; i < cwd.children.length + 1; i++) {
        // addLine(file.name);
        s += cwd.children[i - 1].name + "    ";
        if (i % 5 === 0) {
            s += "\n";
        }
    }
    addLine(s);
}
