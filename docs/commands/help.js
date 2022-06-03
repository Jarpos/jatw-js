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
