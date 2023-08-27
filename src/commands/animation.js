import { terminal } from "../globals.js";
import { Wasm } from "../helpers/wasm.js";

/**
 * Plays an animation
 * @param {string[]} argv Arguments
 */
export function Animation(argv) {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 640;

    const window = document.createElement("d-window");
    window.setAttribute("name", "Animation");
    window.shadowRoot.appendChild(canvas);

    Wasm.Animation(canvas);
    terminal().appendChild(window);
}
