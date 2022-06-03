/**
 * Opens new window with picture viewer
 */
function Viewer() {
    const viewer = document.createElement("d-window");
    viewer.setAttribute("title", "Picture Viewer");
    viewer.setAttribute("src", "")
    document.getElementsByTagName("body")[0].appendChild(viewer);
}
