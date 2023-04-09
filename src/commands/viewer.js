"use strict";

import { addLine } from "../helpers.js";
import { terminal } from "../globals.js";
import { FILE_TYPE } from "../files/filesystem.js";
import { resolvePath } from "../files/helpers.js";

/**
 * Opens new window with picture viewer
 * @param {string[]} argv Arguments
 */
export function Viewer(argv) {
    const path = argv.length != 0 ? argv[0] : ".";
    const pictures = resolvePath(path).children
        .filter(e => e.type === FILE_TYPE.PICTURE)
        .map(e => { return { name: e.name }; });

    if (pictures?.length > 0) {
        const viewer = document.createElement("d-img-viewer");
        viewer.setAttribute("name", "Picture Viewer");
        viewer.setAttribute("folder", "files/pictures/");
        viewer.setAttribute("files", JSON.stringify(pictures));
        terminal().appendChild(viewer);
    } else {
        addLine("Error: Couldn't find any pictures in the current folder");
    }
}
