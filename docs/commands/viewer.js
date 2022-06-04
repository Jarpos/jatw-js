/**
 * Opens new window with picture viewer
 */
function Viewer() {
    const viewer = document.createElement("d-window");
    viewer.setAttribute("name", "Picture Viewer");
    viewer.setAttribute("src", "");
    terminal().appendChild(viewer);
}
