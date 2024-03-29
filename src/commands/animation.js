import { CanvasWindow } from "../components/CanvasWindow.js";
import { terminal } from "../globals.js";
import { Wasm } from "../wasm/wasm.js";

/**
 * Plays an animation
 * @param {string[]} argv Arguments
 */
export function Animation(argv) {
    const window =
        CanvasWindow.GetAsHtmlElement("Animation.c", 640, 640);

    Wasm.Animation(window);
    terminal().appendChild(window);
}
