"use strict";

/**
 * Prints help screen
 */
function Help() {
    addLine();
    for (const [key, value] of commands.entries()) {
        const line = addLine("    ", key, " ".repeat(15 - key.length), value.info);
        line.classList.add("nomark", "command");
        line.addEventListener("click", (e) => {
            setCurrentInput(key);
            HandleEnter(null);
        });
    }
    addLine();
}
