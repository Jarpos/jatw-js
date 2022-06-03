/**
 * Map containing all viable commands
 * @example
 *     commands.get("help").cmd();
 *     commands.get("reboot").cmd();
 */
const commands = new Map([
    ["help", /****/ { cmd: Help, info: "Prints this help", }],
    ["times", /***/ { cmd: Times, info: "Prints a bunch times", }],
    ["reboot", /**/ { cmd: Reboot, info: "Reloads terminal", }],
]);

/**
 * Tries to find suggestion in the commands map for a given string
 * @param {string} s input string
 * @returns Possible suggestions for the given string
 */
function getSuggestions(s) {
    let suggestions = [];
    if (s.length > 0) {
        for (const [key, value] of commands.entries()) {
            if (key.indexOf(s) === 0) {
                suggestions.push(key);
            }
        }
    }
    return suggestions;
}

/**
 * Prints help screen
 */
function Help() {
    const span = (key) =>
        `<span class="command" onclick=setCurrentInput("${key}")>${key}</span>`;

    for (const [key, value] of commands.entries()) {
        addLine(span(key), " ".repeat(10 - key.length), value.info);
    }
}

/**
 * Prints a bunch of Times
 * @TODO: Add more differing timezones
 */
function Times() {
    const now = new Date();
    addLine("Your Time now:     ", now.toLocaleString("sv-SE"));
    addLine();
    addLine("UTC Time now:      ", now.toLocaleString("sv-SE", { timeZone: "UTC", }));
    addLine("Japan Time now:    ", now.toLocaleString("sv-SE", { timeZone: "Asia/Tokyo", }));
    addLine("Sydney Time now:   ", now.toLocaleString("sv-SE", { timeZone: "Australia/Sydney", }));
    addLine("New York Time now: ", now.toLocaleString("sv-SE", { timeZone: "America/New_York", }));
    addLine();
    addLine("Unix time:         ", Date.now());
}

/**
 * Reloads the site, effectively "rebooting" the terminal
 */
function Reboot() {
    location.reload();
}
