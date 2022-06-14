"use strict";

/**
 * Prints help screen
 * @param {string[]} argv Arguments
 */
function Help(argv) {
    addLine();
    for (const [key, value] of commands.entries()) {
        const line = addLine("    ", key.padEnd(15, " "), value.info);
        line.classList.add("nomark", "command");
        line.addEventListener("click", (e) => setAndExecuteCommand(key));
    }
    addLine();
    addLine("    ", "[tab]".padEnd(15, " "), "Autocompletion");
    addLine("    ", "[ctrl+c]".padEnd(15, " "), "Cancel current command");
    addLine("    ", "[click]".padEnd(15, " "), "You can click on some stuff to execute/use it");
    addLine();
}
