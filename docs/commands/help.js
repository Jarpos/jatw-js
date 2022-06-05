"use strict";

/**
 * Prints help screen
 */
function Help() {
    const span = (key) =>
        `<span class="command" onclick=setCurrentInput("${key}")>${key}</span>`;

    addLine();
    for (const [key, value] of commands.entries()) {
        const line = addLine("    ", span(key), " ".repeat(15 - key.length), value.info);
        line.addEventListener("click", (e) => {
            setCurrentInput(key);
            HandleEnter(null);
        });
    }
    addLine();
}
