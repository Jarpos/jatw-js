"use strict";

/**
 * Opens new window with picture viewer
 * @param {string[]} argv Arguments
 */
function Viewer(argv) {
    const viewer = document.createElement("d-img-viewer");
    viewer.setAttribute("name", "Picture Viewer");
    viewer.setAttribute("folder", "files/pictures/");
    viewer.setAttribute("files", JSON.stringify(cwd.children.map(e => { return { name: e.name }; })));
    terminal().appendChild(viewer);
}
