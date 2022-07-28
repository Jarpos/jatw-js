"use strict";

/**
 * Root folder
 * @type Folder_c
 */
const fileroot = setUpFilesystem();

/**
 * Current Working Directory
 */
let cwd = fileroot;

/**
 * Sets up the filesystem and returns the root folder reference
 * @returns the filesystem root folder reference
 */
function setUpFilesystem() {
    /**
     * Reference to root folder
     * @example
     *     ~/
     *     +-- pictures
     *     |   |
     *     |   + IMG_***.jpg
     *     |
     *     +-- other
     *         |
     *         + text.txt
     *         |
     *         +-- another
     *             |
     *             + test.txt
     */
    const root = new Folder_c("~", null).addChildren(
        (new Folder_c("pictures")).addChildren(
            new File_c(FILE_TYPE.PICTURE, "IMG_0121.jpg", "files/pictures/IMG_0121.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_0416.jpg", "files/pictures/IMG_0416.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_0428.jpg", "files/pictures/IMG_0428.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_0529.jpg", "files/pictures/IMG_0529.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_0531.jpg", "files/pictures/IMG_0531.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_0591.jpg", "files/pictures/IMG_0591.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_0593.jpg", "files/pictures/IMG_0593.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_0701.jpg", "files/pictures/IMG_0701.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_0755.jpg", "files/pictures/IMG_0755.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_0776.jpg", "files/pictures/IMG_0776.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_0782.jpg", "files/pictures/IMG_0782.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_0843.jpg", "files/pictures/IMG_0843.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_0847.jpg", "files/pictures/IMG_0847.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_0871.jpg", "files/pictures/IMG_0871.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_0919.jpg", "files/pictures/IMG_0919.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_0922.jpg", "files/pictures/IMG_0922.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_1005.jpg", "files/pictures/IMG_1005.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_1011.jpg", "files/pictures/IMG_1011.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_1035.jpg", "files/pictures/IMG_1035.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_1055.jpg", "files/pictures/IMG_1055.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_1080.jpg", "files/pictures/IMG_1080.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_1093.jpg", "files/pictures/IMG_1093.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_1257.jpg", "files/pictures/IMG_1257.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_1492.jpg", "files/pictures/IMG_1492.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_1586.jpg", "files/pictures/IMG_1586.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_1853.jpg", "files/pictures/IMG_1853.jpg"),
            new File_c(FILE_TYPE.PICTURE, "IMG_1906.jpg", "files/pictures/IMG_1906.jpg"),
        ),

        new File_c(FILE_TYPE.TEXT, "about.txt", [
            "About this website:",
            "    well, obviously I was far from the first to do something like this, so I'd like",
            "    to give credit to my main inspiration:",
            "    <a href=https://dev.to/m4tt72/i-created-a-terminal-style-website-1jb2>https://dev.to/m4tt72/i-created-a-terminal-style-website-1jb2</a>",
            "    I'm also very aware that this is far from a perfect, or even good way to do things...",
            "    I'll probably regret making this in not too much time, but for now I feel like it's",
            "    \"fine\". If you have any problems or want to suggest improvements, you can write an issue",
            "    or pull request or whatever.",
            " ",
            "About \"me\":",
            "   I dunno... \"@TODO add more info\" I guess?",
            " ",
        ]),
        new File_c(FILE_TYPE.TEXT, "features.txt", [
            "Use the querystring of the url (the ? part) to execute",
            "semicolon-seperated commands upon opening",
            "Examples:",
            "    ?tree;cd%20other     Outputs file tree, then cds to other",
            "    ?reboot;             Endless loop of reloading the website",
            "    ?cd pictures;viewer  cds to pictures, and opens the picture viewer",
            "    ?cat Features.txt    prints this file to the terminal",
            "(\"%20\"s are automatically converted to spaces on page load)",
            " ",
            "The hash part of the url is used to save the theme between pageloads",
            "Examples:",
            "    #t-pride  Trans-pride theme",
            "    #g-pride  Gay-pride theme",
            "    #l-pride  Lesbian-pride theme",
            "    #light    Light mode",
            "Use command: theme to list all available themes and",
            "theme [theme] to choose a specific theme",
            " ",
        ]),
    );
    return root;
}
