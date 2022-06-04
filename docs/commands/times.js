"use strict";

/**
 * Prints a bunch of Times
 * @link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 * @TODO: Add more differing timezones
 */
function Times() {
    const now = new Date();
    // Using swedish locale bc they use the ISO-8601 format (kinda)
    addLine();
    addLine("Your Time now:     ", now.toLocaleString("sv-SE"));
    addLine();
    addLine("UTC Time now:      ", now.toLocaleString("sv-SE", { timeZone: "UTC", }));
    addLine("Japan Time now:    ", now.toLocaleString("sv-SE", { timeZone: "Asia/Tokyo", }));
    addLine("Sydney Time now:   ", now.toLocaleString("sv-SE", { timeZone: "Australia/Sydney", }));
    addLine("New York Time now: ", now.toLocaleString("sv-SE", { timeZone: "America/New_York", }));
    addLine();
    addLine("Unix time:         ", Date.now());
    addLine();
}
