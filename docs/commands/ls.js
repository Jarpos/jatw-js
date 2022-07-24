"use strict";

/**
 * Lists contents of directory
 * @param {string[]} argv Arguments
 */
function Ls(argv) {
    let listed = addLine();
    listed.innerHTML = "";
    for (let i = 0; i < cwd.children.length; i++) {
        const item = document.createElement("span");
        item.innerText = cwd.children[i].name + "     ";
        listed.append(item);

        if (cwd.children[i].isDir()) {
            item.setAttribute("class", "ls-folder")
        } else {
            item.setAttribute("class", "ls-file")
        }

        if ((i - 4) % 5 === 0) {
            listed = addLine();
            listed.innerHTML = "";
        }
    }
}
