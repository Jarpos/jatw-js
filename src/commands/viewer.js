"use strict";

import { addLine } from "../helpers.js";
import { terminal } from "../globals.js";
import { FILE_TYPE } from "../files/filesystem.js";
import { resolvePath } from "../files/helpers.js";
import { ImgViewer } from "../components/ImgViewer.js";

/**
 * Opens new window with picture viewer
 * @param {string[]} argv Arguments
 */
export function Viewer(argv) {
    const path = argv.length != 0 ? argv[0] : ".";
    const pictures = resolvePath(path).children
        .filter(f => f.type === FILE_TYPE.PICTURE)
        .map(f => { return { name: f.name, link: f.content }; });

    if (pictures?.length > 0) {
        const viewer = ImgViewer.GetAsHtmlElement("Picture Viewer", pictures);
        terminal().appendChild(viewer);
    } else {
        addLine("Error: Couldn't find any pictures in the current folder");
    }
}
