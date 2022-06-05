"use strict";

/**
 * Current line that user can manipulate with input
 * @type HTMLDivElement
 */
let currentline;

/**
 * Pre element with `pre` id
 * @returns Reference to pre element with terminal id
 */
const terminal = () => document.getElementById("terminal");

/**
 * Body element
 * @returns Reference to body element
 */
const body = () => document.getElementsByTagName("body")[0];

/**
 * Html element
 * @returns Reference to html element
 */
const html = () => document.getElementsByTagName("html")[0];

/**
 * Css root element
 * @returns Reference to css root element
 */
const styleroot = () => document.documentElement.style;

/**
 * History of inputs made
 */
const cmdhistory = {
    index: 0,
    commands: ["help",],

    /**
     * Get the current item from the cmdhistory specified by `cmdhistory.index`
     * @returns Current item from cmdhistory
     */
    get: () => cmdhistory.index < 0 ? "" : cmdhistory.commands[cmdhistory.index],

    /**
     * Adds command to the start of the command history.
     * Does not add it if the same command was just exectued.
     * @param {string} command Command to add to the history
     */
    push: (command) => {
        cmdhistory.index = -1;
        if (command.length > 0 && cmdhistory.commands[0] !== command) {
            cmdhistory.commands.unshift(command);
        }
    },

    /**
     * Moves up the index for the command history by one if possible
     * @returns The new index
     */
    up: () => cmdhistory.index += cmdhistory.index < cmdhistory.commands.length - 1 ? 1 : 0,

    /**
     * Moves down the index for the command history by one if possible
     * @returns The new index
     */
    down: () => cmdhistory.index -= cmdhistory.index >= 0 ? 1 : 0,
};
