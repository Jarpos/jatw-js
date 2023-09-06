import Module from "./animation.c.js";

import { CanvasWindow } from "../components/CanvasWindow.js";
import { addLine, nop } from "../helpers.js";

/** Options for imported `factorize` module */
const factorizeImport = {
    env: {
        /** Prime factors string (@TODO: Make this better. Maybe return a string from C?) */
        primes: "",

        /**
         * Updates the prime factors string
         * @param {u64} prime Prime to add to the output primes
         * @returns updated primes string
         */
        UpdateLine: (prime) => factorizeImport.env.primes += `${prime} `,

        /**
         * Executed when memory is grown
         * @param {i32} index Which memory has grown
         * @link https://emscripten.org/docs/api_reference/emscripten.h.html#c.emscripten_notify_memory_growth
         */
        emscripten_notify_memory_growth: (index) => nop(),
        memory: new WebAssembly.Memory({ initial: 2 ** 16, }),
    },
};

/** Exported functions from Wasm */
const exports = {
    /** Factorize function as normal JavaScript function */
    factorize_c: await WebAssembly
        .instantiateStreaming(fetch('wasm/factorize.c.wasm'), factorizeImport)
        .then(result => result.instance.exports)
        .catch(e => console.log(e)),

    /**
     * Animation function getter, to make it possible to run
     * multiple animations at the same time
     */
    animation_c: async () => await Module()
        .then(result => result)
        .catch(e => console.log(e)),
};

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
