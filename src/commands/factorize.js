"use strict";

import { addLine } from "../helpers.js";
import { Wasm } from "../helpers/wasm.js";

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
        } else {
            addLine("Usage: factorize [number to factorize]");
        }
    } catch (/** @type Error */ error) {
        addLine("Error: ", error.toString())
        return;
    }
}

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
