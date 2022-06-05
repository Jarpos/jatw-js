function Theme() {
    /**
     * Creates a theme object
     * @param {string} n Name
     * @param {string} f Foreground
     * @param {string} b Background
     * @param {string} u Username
     * @param {string} h Hostname
     * @returns Theme
     */
    const maketheme = (n, f, b, u, h) => {
        return { name: n, fg: f, bg: b, uname: u, hname: h, };
    };

    // Array with defined themes
    // @TODO: Maybe make this a map? Then global and save between pageloads?
    const themes = [
        // ------ Name -------------- fg ------ bg ------ uname --- hname ----
        maketheme("default", /******/ 0xc7ccd1, 0x1c2023, 0x95c7ae, 0xae95c7),
        maketheme("alternative", /**/ 0x9ea7a6, 0x232c31, 0xa03b1e, 0x3643b4),
        maketheme("hekr", /*********/ 0x00ff00, 0x000000, 0x00ff00, 0x00ff00),
        maketheme("light", /********/ 0x303030, 0xfefefe, 0x75b5aa, 0xaa759f),
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
