"use strict";

import { addLine } from "./helpers.js";

/**
 * Chooses and then prints random logo
 */
export function printRandomLogo() {
    const logo = logos[Math.floor(Math.random() * logos.length)];
    for (const line of logo) {
        addLine(line);
    }
}

/**
 * Prints bottom info with extra line
 */
export function printBottomInfo() {
    addLine();
    for (const line of bottominfo) {
        addLine(line);
    }
    addLine();
}

/**
 * Logos generated with:
 * @link https://patorjk.com/software/taag
 * @TODO Think if I should keep this or remove it...
 */
const logos = [
    [
        "      __        __                         __         ",
        "     |__|____ _/  |___  _  __             |__| ______ ",
        "     |  \\__  \\\\   __\\ \\/ \\/ /  ______     |  |/  ___/ ",
        "     |  |/ __ \\|  |  \\     /  /_____/     |  |\\___ \\  ",
        " /\\__|  (____  /__|   \\/\\_/           /\\__|  /____  > ",
        " \\______|    \\/                       \\______|    \\/  ",
    ],
    [
        "        _       __                 _      ",
        "       (_)___ _/ /__      __      (_)____ ",
        "      / / __ `/ __/ | /| / /_____/ / ___/ ",
        "     / / /_/ / /_ | |/ |/ /_____/ (__  )  ",
        "  __/ /\\__,_/\\__/ |__/|__/   __/ /____/   ",
        " /___/                      /___/         ",
    ],
    [
        "   ,--.          ,--.                    ,--.        ",
        "   `--' ,--,--.,-'  '-.,--.   ,--.,-----.`--' ,---.  ",
        "   ,--.' ,-.  |'-.  .-'|  |.'.|  |'-----',--.(  .-'  ",
        "   |  |\\ '-'  |  |  |  |   .'.   |       |  |.-'  `) ",
        " .-'  / `--`--'  `--'  '--'   '--'     .-'  /`----'  ",
        " '---'                                 '---'         ",
    ],
    [
        "                                                           ",
        "      ██╗ █████╗ ████████╗██╗    ██╗           ██╗███████╗ ",
        "      ██║██╔══██╗╚══██╔══╝██║    ██║           ██║██╔════╝ ",
        "      ██║███████║   ██║   ██║ █╗ ██║█████╗     ██║███████╗ ",
        " ██   ██║██╔══██║   ██║   ██║███╗██║╚════╝██   ██║╚════██║ ",
        " ╚█████╔╝██║  ██║   ██║   ╚███╔███╔╝      ╚█████╔╝███████║ ",
        "  ╚════╝ ╚═╝  ╚═╝   ╚═╝    ╚══╝╚══╝        ╚════╝ ╚══════╝ ",
    ],
    [
        "________       _____                 ________          ",
        "______(_)_____ __  /___      __      ______(_)_______  ",
        "_____  /_  __ `/  __/_ | /| / /___________  /__  ___/  ",
        "____  / / /_/ // /_ __ |/ |/ /_/_____/___  / _(__  )   ",
        "___  /  \\__,_/ \\__/ ____/|__/        ___  /  /____/    ",
        "/___/                                /___/             ",
    ],
];

/**
 * Bottom Information that is printed below the "logo" text
 */
const bottominfo = [
    "Source: <a href=\"https://github.com/Jarpos/jatw-js\">https://github.com/Jarpos/jatw-js</a>",
];