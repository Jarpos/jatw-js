"use strict";

import { addLine } from "../helpers.js";

/**
 * Tries to find the file passed in argv starting from fs.cwd
 * @param {string[]} argv Arguments
 */
export function Factorize(argv) {
    try {
        var number = +argv[0];
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
        addLine(results.join(" "));
    } catch (/** @type Error */ error) {
        addLine("Error: ", error.toString())
        return;
    }
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
