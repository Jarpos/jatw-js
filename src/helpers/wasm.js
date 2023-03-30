import { addLine } from "../helpers.js";

/**
 * Options for the imported Wasm modules
 */
const importObject = {
    module: {},
    imports: {},
    env: {
        /** Prime factors string (@TODO: Make this better. Maybe return a string from C?) */
        primes: "",

        /**
         * Updates the prime factors string
         * @param {ui64} prime Prime to add to the output primes
         * @returns updated primes string
         */
        UpdateLine: (prime) => importObject.env.primes += `${prime} `,

        /**
         * See:
         * https://emscripten.org/docs/api_reference/emscripten.h.html#c.emscripten_notify_memory_growth
         * @param {i32} index Executed when memory is grown
         */
        emscripten_notify_memory_growth: (index) => { },
        memory: new WebAssembly.Memory({ initial: 2 ** 16, }),
    },
};

/**
 * Exported functions from Wasm
 */
const exports =
    await WebAssembly
        .instantiateStreaming(fetch('helpers/factorize.wasm'), importObject)
        .then(result => result.instance.exports);

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
        importObject.env.primes = "";
        exports.Factorize(BigInt(number));

        addLine("Factorizing: ", BigInt(number));
        addLine(importObject.env.primes);
    },
};
