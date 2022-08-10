"use strict";

/**
 * Current line that user can manipulate with input
 * @type InputLine
 */
let currentline;

/**
 * Handler that handles... enter
 * @type function(KeyboardEvent): void
 */
let enterhandler = defaultEnterHandler;

/**
 * Default handler for enter presses
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function defaultEnterHandler(e) {
    const input = currentline.Input.split(/ +/);
    const command = commands.get(input[0]);

    if (command) {
        command.cmd(input.slice(1));
    } else if (input.join(" ").length > 0) {
        addLine("Could not find command \"", input.join(" "), "\"");
    }

    cmdhistory.push(input.join(" "));
    if (enterhandler === defaultEnterHandler) {
        newCurrentline();
    }
}

/**
 * Handler that handles getting the info part of an input line
 * @type function(): string
 */
let inputlineinfohandler = defaultInputLineInfoHandler;

/**
 * Default handler for getting Input line info
 * @returns Input line info
 */
function defaultInputLineInfoHandler() {
    return getPromptString();
}

/**
 * Characters that are allowed as input for the terminal
 */
const allowedcharacters =
    " " +
    "0123456789" +
    "abcdefghijklmnopqrstuvwxyz" +
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "\"\\()[]{}|?!.,;:_-+/%=&$#'~*^";

/**
 * Pre element with `pre` id
 * @returns Reference to pre element with terminal id
 */
const terminal = () => document.getElementById("terminal");

/**
 * Time that the document loaded
 */
const loadtime = new Date();

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
 * Quick access for different parts of the uri
 */
const uri = {
    /**
     * Get href of current url (full url)
     * @returns Href of current location
     */
    href: () => document.location.href,

    /**
     * Get the current hostname
     * @returns hostname for current site
     */
    hostname: () => document.location.hostname,

    /**
     * Get the commands in the search query part of the uri
     * @returns {string[]} All the ; seperated commands in the search query part of the string
     */
    commands: () => {
        return document.location.search
            .substring(1)
            .replaceAll("%20", " ")
            .replaceAll("%21", "!")
            .replaceAll("%22", "\"")
            .replaceAll("%23", "#")
            .replaceAll("%24", "$")
            .replaceAll("%25", "%")
            .replaceAll("%26", "&")
            .replaceAll("%27", "'")
            .replaceAll("%28", "(")
            .replaceAll("%29", ")")
            .replaceAll("%2A", "*")
            .replaceAll("%2B", "+")
            .replaceAll("%2C", ",")
            .replaceAll("%2D", "-")
            .replaceAll("%2E", ".")
            .replaceAll("%2F", "/")
            .replaceAll("%3A", ":")
            .replaceAll("%3B", ";")
            .replaceAll("%3C", "<")
            .replaceAll("%3D", "=")
            .replaceAll("%3E", ">")
            .replaceAll("%3F", "?")
            .replaceAll("%40", "@")
            .replaceAll("%5B", "[")
            .replaceAll("%5C", "\\")
            .replaceAll("%5D", "]")
            .replaceAll("%5E", "^")
            .replaceAll("%5F", "_")
            .split(";")
            .filter(v => v?.length > 0);
    },

    /**
     * Get the selected theme from the uri
     * @returns theme from hash without # sign
     */
    theme: () => document.location.hash.replace("#", ""),
};

/**
 * Css root element
 * @returns Reference to css root element
 */
const styleroot = () => document.documentElement.style;

/**
 * History of inputs made
 */
const cmdhistory = {
    /**
     * Current index for commands array
     * @type number
     */
    index: 0,

    /**
     * Commandhistory from current session
     * @type string[]
     */
    commands: [],

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
