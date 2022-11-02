"use strict";

import { io, cmdhistory } from "./globals.js";
import { commands } from "./commands/commands.js";
import { addLine, getPromptString, newCurrentline } from "./helpers.js";

/**
 * Resets `enterhandler` and `inputlineinfohandler` to
 * `defaultEnterHandler` and `defaultInputLineInfoHandler`
 * respectively
 */
export function resetHandlers() {
    io.enterhandler = defaultEnterHandler;
    io.inputlineinfohandler = defaultInputLineInfoHandler;
}

/**
 * Default handler for enter presses
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
export function defaultEnterHandler(e) {
    const input = io.currentline.Input.split(/ +/);
    const command = commands.get(input[0]);

    if (command) {
        command.cmd(input.slice(1));
    } else if (input.join(" ").length > 0) {
        addLine("Could not find command \"", input.join(" "), "\"");
    }

    cmdhistory.push(input.join(" "));
    if (io.enterhandler === defaultEnterHandler) {
        newCurrentline();
    }
}

/**
 * Default handler for getting Input line info
 * @returns Input line info
 */
export function defaultInputLineInfoHandler() {
    return getPromptString();
}
