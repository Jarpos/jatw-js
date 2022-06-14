"use strict";

/**
 * Opens new window with picture viewer
 * @param {string[]} argv Arguments
 */
function Viewer(argv) {
    const viewer = document.createElement("d-img-viewer");
    viewer.setAttribute("name", "Picture Viewer");
    viewer.setAttribute("folder", "files/pictures/");
    viewer.setAttribute("files", JSON.stringify(files));
    terminal().appendChild(viewer);
}
