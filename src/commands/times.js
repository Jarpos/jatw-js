"use strict";

import { addLine } from "../helpers.js";

/**
 * Prints a bunch of Times
 * @param {string[]} argv Arguments
 * @link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 * @TODO Add more differing timezones
 */
export function Times(argv) {
    // Using swedish locale bc they use the ISO-8601 format (kinda)
    const s = "sv-SE";
    const t = (l) => { return { timeZone: l, }; };
    const now = new Date();

    addLine();
    addLine("Your Time now:        ", now.toLocaleString(s));
    addLine();
    addLine("UTC Time now:         ", now.toLocaleString(s, t("UTC")));
    addLine("Japan Time now:       ", now.toLocaleString(s, t("Asia/Tokyo")));
    addLine("Sydney Time now:      ", now.toLocaleString(s, t("Australia/Sydney")));
    addLine("New York Time now:    ", now.toLocaleString(s, t("America/New_York")));
    addLine();
    addLine("Unix time:            ", Date.now());
    addLine();
}
