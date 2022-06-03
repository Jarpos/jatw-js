/**
 * Current line that user can manipulate with input
 * @type HTMLDivElement
 */
let currentline;

/**
 * History of inputs made
 */
let cmdhistory = {
    index: 0,
    commands: ["help",],

    /**
     * Get the current item from the cmdhistory specified by `cmdhistory.index`
     * @returns Current item from cmdhistory
     */
    get: () => cmdhistory.index < 0 ? "" : cmdhistory.commands[cmdhistory.index],

    /**
     * Adds command to the start of the command history
     * @param {string} command Command to add to the history
     */
    push: (command) => {
        cmdhistory.index = -1;
        if (command.length > 0 && cmdhistory.commands[0] !== command) {
            cmdhistory.commands.unshift(command);
        }
    },

    up: () => cmdhistory.index += cmdhistory.index < cmdhistory.commands.length - 1 ? 1 : 0,
    down: () => cmdhistory.index -= cmdhistory.index >= 0 ? 1 : 0,
};
