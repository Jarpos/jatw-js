import { addLine } from "../helpers.js";

/**
 * Options for the imported Wasm modules
 */
const importObject = {
    module: {},
    imports: {},
    env: {
        primes: "",
        UpdateLine: (prime) => importObject.env.primes += `${prime} `,
        // memory: new WebAssembly.Memory({ initial: 2 ** 16, }),
    },
};

/**
 * Exported functions from Wasm
 */
const exports =
    await WebAssembly.instantiateStreaming(fetch('helpers/factorize.out.wasm'), importObject)
        .then(result => result.instance.exports);

/**
 * Exported Wasm functions
 */
export const Wasm = {
    /**
     * Factorizes number and prints the prime factors to the console
     * @param {number | string | BigInt } number Number to factorize
     * @returns {void} Nothing
     */
    Factorize: (number) => {
        importObject.env.primes = "";
        addLine("Factorizing: ", BigInt(number));
        exports.Factorize(BigInt(number));
        addLine(importObject.env.primes);
    },
};
