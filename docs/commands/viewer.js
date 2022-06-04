"use strict";

/**
 * Opens new window with picture viewer
 */
function Viewer() {
    const viewer = document.createElement("d-window");
    viewer.setAttribute("name", "Picture Viewer");
    const file = "files/" + Array.from(files)[Math.floor(Math.random() * files.size)][0];
    viewer.setAttribute("src", file);
    terminal().appendChild(viewer);
}
