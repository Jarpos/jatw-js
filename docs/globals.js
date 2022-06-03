/**
 * Current line that user can manipulate with input
 * @type HTMLDivElement
 */
let currentline;

/**
 * History of inputs made
 */
let inputhistory = {
    index: 0,
    commands: ["help",],

    /**
     * Get the current item from the inputhistory specified by `inputhistory.index`
     * @returns Current item from inputhistory
     */
    get: () => inputhistory.commands[inputhistory.index],

    /**
     * Adds command to the start of the command history
     * @param {string} command Command to add to the history
     */
    push: (command) => {
        inputhistory.index = -1;
        if (command.length > 0) {
            inputhistory.commands.unshift(command);
        }
    },
};
