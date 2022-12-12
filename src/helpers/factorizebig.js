"use strict";

import { addLine } from "../helpers.js";

/**
 * Tries to find the file passed in argv starting from fs.cwd
 * @param {string|BigInt|number} arg Number to factorize
 */
export function FactorizeBig(arg) {
    try {
        var number = BigInt(arg);
        const sieve = SievePrimes(Math.sqrt(+arg));
        const bitcount = sieve.length * 64;

        const results = [];
        for (let i = 2n; i < bitcount; i++) {
            if (!GetBit(sieve, i)) {
                for (; number % i === 0n; number /= i) {
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
    }
}

/**
 * Sieves a prime sieve for primes
 * @param {number} limit Number to find primes up to
 * @returns Sieved Prime sieve
 */
function SievePrimes(limit) {
    const sieve = new BigUint64Array(Number(limit) / 64 + 1);
    for (let i = 2n; i < limit; i++) {
        for (let j = i * i; j < limit; j += i) {
            SetBit(sieve, j, 1);
        }
    }
    return sieve;
}

/**
 * Get specific bit from sieve
 * @param {BigUint64Array} sieve Sieve to get the bit from
 * @param {bigint} index Bitindex
 * @returns The bit value
 */
function GetBit(sieve, index) {
    const [x, y] = TranslateIndex(index);
    return (sieve[x] >> y) & 0b1n;
}

/**
 * Set specific bit from sieve
 * @param {BigUint64Array} sieve Sieve to set the bit in
 * @param {bigint} index Bitindex
 */
function SetBit(sieve, index) {
    const [x, y] = TranslateIndex(index);
    sieve[x] |= (1n << y);
}

/**
 * Translates bitindex to index for sieve and bit
 * @param {bigint} index Index for bit
 * @returns Array of indices, where [0] is the sieve index, and [1] is the bit index in the sieve
 */
function TranslateIndex(index) {
    return [index / 64n, index % 64n];
}
