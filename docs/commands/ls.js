"use strict";

/**
 * Lists contents of directory
 * @param {string[]} argv Arguments
 */
function Ls(argv) {
    const folder = argv.length > 0 ? resolvePath(argv[0]) : cwd;

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
        addLine("Error: Could not find foler ", argv[0]);
    }
}
