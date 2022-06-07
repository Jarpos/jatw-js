"use strict";

/**
 * Opens new window with picture viewer
 */
function Viewer() {
    const viewer = document.createElement("d-img-viewer");
    viewer.setAttribute("name", "Picture Viewer");
    viewer.setAttribute("files", JSON.stringify(files));
    terminal().appendChild(viewer);
}
