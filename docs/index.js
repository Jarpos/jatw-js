"use strict";

enterhandler = defaultEnterHandler;
printRandomLogo();
printBottomInfo();
newCurrentline();
setAndExecuteCommand("help");
uri.commands().forEach(c => setAndExecuteCommand(validateInput(c)));
if (uri.theme()) {
    Theme([uri.theme()]);
} else {
    /**
     * Check on first load if user has light mode, and if so set the theme to the
     * "light" theme, else just go with the "default" theme
     */
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        Theme(["light"]);
    }
}

body().addEventListener("keydown", (e) => {
    if (isLetter(e.key) && !e.ctrlKey || e.key === " ") {
        e.preventDefault();
        currentline.AddInput(e.key);
    } else {
        switch (e.key) {
            case "Backspace": /***/ HandleBackspace(e); /**/ break;
            case "Enter": /*******/ HandleEnter(e); /******/ break;
            case "Tab": /*********/ HandleTab(e); /********/ break;
            case "ArrowUp": /*****/ HandleUp(e); /*********/ break;
            case "ArrowDown": /***/ HandleDown(e); /*******/ break;
            case "ArrowLeft": /***/ HandleLeft(e); /*******/ break;
            case "ArrowRight": /**/ HandleRight(e); /******/ break;
            case "Delete": /******/ HandleDelete(e); /*****/ break;
            case "c": /***********/ newCurrentline(); /****/ break;
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
    if (e.ctrlKey) {
        currentline.ClearLine();
    } else {
        currentline.Backspace();
    }
}

/**
 * Execute line
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function HandleEnter(e) {
    enterhandler(e);
}

/**
 * Auto complete with suggestion
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function HandleTab(e) {
    e.preventDefault();
    const input = currentline.Input;
    const suggestions = getSuggestions(input);

    if (suggestions.length === 1) {
        currentline.Input = suggestions[0];
    } else if (suggestions.length > 1) {
        addLine(suggestions.join("    "));
        newCurrentline();
        currentline.Input = input;
    }
}

/**
 * Go one command up in the input history
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function HandleUp(e) {
    e.preventDefault();
    cmdhistory.up();
    currentline.Input = cmdhistory.get();
}

/**
 * Go one command down in the input history
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function HandleDown(e) {
    cmdhistory.down();
    currentline.Input = cmdhistory.get();
}

/**
 * Go one command down in the input history
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function HandleLeft(e) {
    if (e.ctrlKey) {
        currentline.MoveCaretStart();
    } else {
        currentline.MoveCaretLeft();
    }
}

/**
 * Go one command down in the input history
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function HandleRight(e) {
    if (e.ctrlKey) {
        currentline.MoveCaretEnd();
    } else {
        currentline.MoveCaretRight();
    }
}

/**
 * Go one command down in the input history
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function HandleDelete(e) {
    currentline.Delete();
}
