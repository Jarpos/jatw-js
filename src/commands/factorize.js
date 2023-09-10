"use strict";

import { addLine } from "../helpers.js";
import { FactorizeBig } from "../wasm/factorizebig.js";
import { Wasm } from "../wasm/wasm.js";

/**
 * Tries to find the file passed in argv starting from fs.cwd
 * @param {string[]} argv Arguments
 */
export function Factorize(argv) {
    try {
        if (argv.length === 1 || argv[1] === "--js") {
            JsFactorize(+argv[0])
        } else if (argv.length === 2 && argv[1] === "--wasm") {
            Wasm.Factorize(argv[0]);
        } else if (argv.length === 2 && argv[1] === "--js64") {
            FactorizeBig(argv[0]);
        } else {
            addLine("Usage: factorize [number to factorize] {factorizer}");
            addLine("Factorizers:");
            addLine("    --js   Normal JavaScript, using 32 bit floating point (default)");
            addLine("    --js64 JavaScript using 64 bit integers, which is very slow");
            addLine("    --wasm C code compiled to WebAssembly, using 64 bit integers");
            addLine("Examples:");
            addLine("    <j-cmd>factorize 3423423 --wasm</j-cmd>");
            addLine("    <j-cmd>factorize 9234843 --js64</j-cmd>");
            addLine("    <j-cmd>factorize 8455233 --js</j-cmd>");
        }
    } catch (/** @type Error */ error) {
        addLine("Error: ", error.toString())
        return;
    }
}

/**
 * Finds the prime factors of a number and prints them to the screen
 * @param {number} number Number to Factorize
 */
function JsFactorize(number) {
    const original = number;
    const sieve = SievePrimes(Math.sqrt(number));
    const results = [];

    for (let i = 2; i < sieve.length; i++) {
        if (!sieve[i]) {
            for (; number % i === 0; number /= i) {
                results.push(i);
            }
        }
    }

    if (number > 1) {
        results.push(number);
    }
    addLine("Factorizing: ", original);
    addLine(results.join(" "));
}

/**
 * Sieves a prime sieve for primes
 * @param {number} limit Number to find primes up to
 * @returns Sieved Prime sieve
 */
function SievePrimes(limit) {
    const sieve = new Int8Array(limit);
    for (let i = 2; i < sieve.length; i++) {
        for (let j = i * i; j < sieve.length; j += i) {
            sieve[j] = 1;
        }
    }
    return sieve;
}
