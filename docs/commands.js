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
