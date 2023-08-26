import { terminal } from "../globals.js";
import { Wasm } from "../helpers/wasm.js";

/**
 * Solves a given calculation e.g. `2^(5+3) * (203 + 302)`
 * @param {string[]} argv Arguments
 */
export function Animation(argv) {
    const window = document.createElement("d-window");
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 640;
    window.shadowRoot.appendChild(canvas);
    Wasm.Animation(canvas);
    terminal().appendChild(window);
}
