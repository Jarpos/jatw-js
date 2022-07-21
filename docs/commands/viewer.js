"use strict";

/**
 * Opens new window with picture viewer
 * @param {string[]} argv Arguments
 */
function Viewer(argv) {
    const pictures = cwd.children
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
