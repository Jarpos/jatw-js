"use strict";

import { addLine } from "../helpers.js";
import { commands } from "./commands.js";

/**
 * Prints help screen
 * @param {string[]} argv Arguments
 */
export function Time(argv) {
    let startTime, endTime;

    // @TODO:
    // Think about changing this, because for now this is just
    // copied over from `defaultEnterHandler`
    const command = commands.get(argv[0]);
    if (command) {
        startTime = Date.now();
        command.cmd(argv.slice(1));
        endTime = Date.now();

        addLine();
        const [ms, s, min] = toTime(endTime - startTime);
        addLine("Total time: ", min, "m ", s, "s ", ms, "ms");
    } else if (argv.join(" ").length > 0) {
        addLine("Could not find command \"", argv.join(" "), "\"");
    } else {
        addLine("Usage: time [command]");
        addLine("Example: time factorize 18446744073709551615 --wasm");
    }
}

/**
 * Converts milliseconds to milliseconds, seconds and minutes
 * @param {number} ms Milliseconds to convert
 * @returns converted as [milliseconds, seconds, minutes]
 */
function toTime(ms) {
    return [
        (ms) % 1000,                // milliseconds
        Math.floor(ms / 1000) % 60, // seconds
        Math.floor(ms / 60000),     // minutes
    ];
}
