import { CanvasWindow } from "../components/CanvasWindow.js";
import { addLine } from "../helpers.js";
import Module from "./animation.c.mjs";

/** Options for imported `factorize` module */
const factorizeImport = {
    env: {
        /** Prime factors string (@TODO: Make this better. Maybe return a string from C?) */
        primes: "",

        /**
         * Updates the prime factors string
         * @param {ui64} prime Prime to add to the output primes
         * @returns updated primes string
         */
        UpdateLine: (prime) => factorizeImport.env.primes += `${prime} `,

        /**
         * @param {i32} index Executed when memory is grown
         * @link https://emscripten.org/docs/api_reference/emscripten.h.html#c.emscripten_notify_memory_growth
         */
        emscripten_notify_memory_growth: (index) => { },
        memory: new WebAssembly.Memory({ initial: 2 ** 16, }),
    },
};

/**
 * Exported functions from Wasm
 */
const exports = {
    factorize_c: await WebAssembly
        .instantiateStreaming(fetch('helpers/factorize.c.wasm'), factorizeImport)
        .then(result => result.instance.exports)
        .catch(e => console.log(e)),

    animation_c: async () => await Module()
        .then(result => result)
        .catch(e => console.log(e)),
}

/**
 * Exported Wasm functions made accessible for the outside
 */
export const Wasm = {
    /**
     * Factorizes number and prints the prime factors to the screen
     * @param {number | string | BigInt } number Number to factorize
     * @returns {void} Nothing
     */
    Factorize: (number) => {
        factorizeImport.env.primes = "";
        exports.factorize_c.Factorize(BigInt(number));

        addLine("Factorizing: ", BigInt(number));
        addLine(factorizeImport.env.primes);
    },

    /**
     * Does a small little animation
     * @param {CanvasWindow} canvasWindow
     */
    Animation: async (canvasWindow) => {
        const animation_c = await exports.animation_c();
        animation_c["canvas"] = canvasWindow.canvas;
        animation_c.asm.Animation();

        canvasWindow.addEventListener("close", () => animation_c.asm.Stop());
    },
};
