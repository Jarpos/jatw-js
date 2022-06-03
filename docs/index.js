document.getElementsByTagName("body")[0].addEventListener("keydown", (e) => {
    if (isLetter(e.key) && !e.ctrlKey || e.key === " ") {
        currentline.innerHTML += e.key;
    } else {
        switch (e.key) {
            case "Backspace": /**/ HandleBackspace(e); /**/ break;
            case "Enter": /******/ HandleEnter(e); /******/ break;
            case "Tab": /********/ HandleTab(e); /********/ break;
            case "ArrowUp": /****/ HandleUp(e); /*********/ break;
            case "ArrowDown": /**/ HandleDown(e); /*******/ break;
        }
    }
    window.scrollTo(0, document.body.scrollHeight);
    console.log(e.key, isLetter(e.key));
});

addLine(getPromptString(), "help");
commands.get("help").cmd();
newCurrentline();

/**
 * Removes some or all content from current line
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function HandleBackspace(e) {
    if (e.ctrlKey) setCurrentInput("");
    else /*******/ setCurrentInput(getCurrentInput().slice(0, -1));
}

/**
 * Execute line
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function HandleEnter(e) {
    const input = getCurrentInput();
    const command = commands.get(input);
    if /***********/ (command) command.cmd();
    else if (input.length > 0) addLine("Could not find command \"", input, "\"");
    newCurrentline();
    inputhistory.push(input);
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
    if (inputhistory.index < inputhistory.commands.length - 1)
        inputhistory.index++;
    setCurrentInput(inputhistory.get());
}

/**
 * Go one command down in the input history
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function HandleDown(e) {
    if (inputhistory.index >= 0)
        inputhistory.index--;
    if (inputhistory.index >= 0) setCurrentInput(inputhistory.get());
    else /*********************/ setCurrentInput("");
}
