"use strict";

printRandomLogo();
printBottomInfo();
newCurrentline();
setAndExecuteCommand("help");
uri.commands().forEach(c => setAndExecuteCommand(c));
if (uri.theme()) {
    Theme([uri.theme()]);
}

body().addEventListener("keydown", (e) => {
    if (isLetter(e.key) && !e.ctrlKey || e.key === " ") {
        currentline.innerHTML += e.key;
    } else {
        switch (e.key) {
            case "Backspace": /**/ HandleBackspace(e); /**/ break;
            case "Enter": /******/ HandleEnter(e); /******/ break;
            case "Tab": /********/ HandleTab(e); /********/ break;
            case "ArrowUp": /****/ HandleUp(e); /*********/ break;
            case "ArrowDown": /**/ HandleDown(e); /*******/ break;
            case "c": /**********/ newCurrentline(); /****/ break;
        }
    }

    window.scrollTo(0, document.body.scrollHeight);
});

/**
 * Removes some or all content from current line
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function HandleBackspace(e) {
    e.preventDefault();
    setCurrentInput(e.ctrlKey ? "" : getCurrentInput().slice(0, -1));
}

/**
 * Execute line
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function HandleEnter(e) {
    const input = getCurrentInput().split(/ +/);
    const command = commands.get(input[0]);

    if (command) {
        command.cmd(input.slice(1));
    } else if (input.length > 0) {
        addLine("Could not find command \"", input, "\"");
    }

    cmdhistory.push(input);
    newCurrentline();
}

/**
 * Auto complete with suggestion
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function HandleTab(e) {
    e.preventDefault();
    const input = getCurrentInput();
    const suggestions = getSuggestions(input);

    if (suggestions.length === 1) {
        setCurrentInput(suggestions[0]);
    } else if (suggestions.length > 1) {
        addLine(suggestions.join("    "));
        newCurrentline();
        setCurrentInput(input);
    }
}

/**
 * Go one command up in the input history
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function HandleUp(e) {
    e.preventDefault();
    cmdhistory.up();
    setCurrentInput(cmdhistory.get());
}

/**
 * Go one command down in the input history
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function HandleDown(e) {
    cmdhistory.down();
    setCurrentInput(cmdhistory.get());
}
