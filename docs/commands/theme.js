"use strict";

/**
 * Prints theme chooser
 * @param {string[]} argv Arguments
 */
function Theme(argv) {
    /**
     * Creates a theme object
     * @param {string} n Name
     * @param {string} f Foreground
     * @param {string} b Background
     * @param {string} u Username
     * @param {string} h Hostname
     * @returns Theme object
     */
    const ct = (n, f, b, u, h) => {
        return { name: n, fg: f, bg: b, uname: u, hname: h, };
    };

    /**
     * Array with defined themes
     * @TODO Maybe make this a map? Then global and save between pageloads?
     */
    const themes = [
        /* Name -------------- fg ------ bg ------ uname --- hname - */
        ct("default", /******/ 0xc7ccd1, 0x1c2023, 0x95c7ae, 0xae95c7),
        ct("alternative", /**/ 0x9ea7a6, 0x232c31, 0xa03b1e, 0x3643b4),
        ct("hekr", /*********/ 0x00ff00, 0x000000, 0x00ff00, 0x00ff00),
        ct("t-pride", /******/ 0xcccccc, 0x1c2023, 0x5bcefa, 0xf5a9b8),
        ct("nb-pride", /*****/ 0xffffff, 0x000000, 0x9c59d1, 0xfff430),
        ct("gq-pride", /*****/ 0xcccccc, 0x1c2023, 0x498022, 0xb57edc),
        ct("bi-pride", /*****/ 0x9b4f96, 0x1c2023, 0xd60270, 0x006bdb),
        ct("l-pride", /******/ 0xd461a6, 0x200010, 0xd62900, 0xff9b55),
        ct("g-pride", /******/ 0x7bade3, 0x060823, 0x26ceaa, 0x5049cb),
        ct("light", /********/ 0x303030, 0xfefefe, 0x75b5aa, 0xaa759f),
    ];

    addLine();
    for (const t of themes) {
        const line = addLine("    ", t.name);
        line.classList.add("nomark", "command");
        line.addEventListener("click", (e) => {
            styleroot().setProperty("--bg-color", "#" + t.bg.toString(16).padStart(6, 0));
            styleroot().setProperty("--fg-color", "#" + t.fg.toString(16).padStart(6, 0));
            styleroot().setProperty("--username", "#" + t.uname.toString(16).padStart(6, 0));
            styleroot().setProperty("--hostname", "#" + t.hname.toString(16).padStart(6, 0));
        });
    }
    addLine();
}
