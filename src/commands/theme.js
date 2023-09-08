"use strict";

import { addLine } from "../helpers.js";
import { styleroot } from "../globals.js";

/**
 * @typedef {{
 *     name: string;
 *     fg: number;
 *     bg: number;
 *     uname: number;
 *     hname: number;
 * }} Theme_t
 */

/**
 * Prints theme chooser or sets first theme set in argv
 * @param {string[]} argv Arguments
 */
export function Theme(argv) {
    /**
     * `Create`s a theme object
     * @param {string} n Name
     * @param {number} f Foreground
     * @param {number} b Background
     * @param {number} u Username
     * @param {number} h Hostname
     * @returns {Theme_t} Theme object
     */
    const c = (n, f, b, u, h) => {
        return { name: n, fg: f, bg: b, uname: u, hname: h, };
    };

    /**
     * Array with defined themes
     * @TODO Maybe make this a map? Then global and save between pageloads?
     */
    const themes = [
        /* Name ------------- fg ------ bg ------ uname --- hname - */
        c("default", /******/ 0xc7ccd1, 0x1c2023, 0x95c7ae, 0xae95c7),
        c("alternative", /**/ 0x9ea7a6, 0x232c31, 0xa03b1e, 0x3643b4),
        c("hekr", /*********/ 0x00ff00, 0x000000, 0x00ff00, 0x00ff00),
        c("t-pride", /******/ 0xcccccc, 0x1c2023, 0x5bcefa, 0xf5a9b8),
        c("nb-pride", /*****/ 0xffffff, 0x111111, 0x9a5acf, 0xfff333),
        c("gq-pride", /*****/ 0xcccccc, 0x1c2023, 0x498022, 0xb57edc),
        c("bi-pride", /*****/ 0x9b4f96, 0x1c2023, 0xd60270, 0x006bdb),
        c("l-pride", /******/ 0xd461a6, 0x200010, 0xd62900, 0xff9b55),
        c("g-pride", /******/ 0x7bade3, 0x060823, 0x26ceaa, 0x5049cb),
        c("light", /********/ 0x303030, 0xfefefe, 0x75b5aa, 0xaa759f),
    ];

    /**
     * Sets to given theme object
     * @param {Theme_t} t Theme to set to
     */
    const setTheme = (t) => {
        document.location.hash = t.name;
        styleroot().setProperty("--bg-color", "#" + t.bg.toString(16).padStart(6, 0));
        styleroot().setProperty("--fg-color", "#" + t.fg.toString(16).padStart(6, 0));
        styleroot().setProperty("--username", "#" + t.uname.toString(16).padStart(6, 0));
        styleroot().setProperty("--hostname", "#" + t.hname.toString(16).padStart(6, 0));
    };

    if (argv?.length >= 1) {
        const theme = themes.find(e => e.name === argv[0]);
        if (theme) {
            setTheme(theme);
        } else {
            addLine("Couldn't find theme: ", argv[0]);
        }
    } else {
        addLine();
        for (const t of themes) {
            const line = addLine("    ", t.name);
            line.classList.add("nomark", "command");
            line.addEventListener("click", (e) => setTheme(t));
        }
        addLine();
    }
}
