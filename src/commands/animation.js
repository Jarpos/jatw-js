import { CanvasWindow } from "../components/CanvasWindow.js";
import { terminal } from "../globals.js";
import { Wasm } from "../helpers/wasm.js";

/**
 * Plays an animation
 * @param {string[]} argv Arguments
 */
export function Animation(argv) {
    const window = CanvasWindow.GetAsHtmlElement("Animation", 640, 640);

    Wasm.Animation(window);
    terminal().appendChild(window);
}
