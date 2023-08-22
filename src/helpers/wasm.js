import { addLine } from "../helpers.js";

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

/** Options for imported `animation` module */
const animationImport = { env: {}, };

/**
 * Exported functions from Wasm
 */
const exports = {
    factorize_c: await WebAssembly
        .instantiateStreaming(fetch('helpers/factorize.c.wasm'), factorizeImport)
        .then(result => result.instance.exports)
        .catch(e => console.log(e)),

    animation_c: await WebAssembly
        .instantiateStreaming(fetch('helpers/animation.c.wasm'), animationImport)
        .then(result => result.instance.exports)
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
     * @returns {void} Nothing
     */
    Animation: () => {
        exports.animation_c.Animation();
    },
};
