"use strict";

/**
 * Create file object with name and type
 * @param {string} name Name of file
 * @param {"picture" | "text"} type Type of file
 * @returns File object
 */
function MakeFile(name, type) {
    return {
        name: name,
        type: type,
    };
}

/**
 * Files Map
 * @TODO Add proper descriptions and more info
 * @TODO Try to emulate a filesystem (semi) properly
 * @TODO Maybe make this an Array?
 */
const files = [
    MakeFile("IMG_0121.jpg", "picture"),
    MakeFile("IMG_0416.jpg", "picture"),
    MakeFile("IMG_0428.jpg", "picture"),
    MakeFile("IMG_0529.jpg", "picture"),
    MakeFile("IMG_0531.jpg", "picture"),
    MakeFile("IMG_0591.jpg", "picture"),
    MakeFile("IMG_0593.jpg", "picture"),
    MakeFile("IMG_0701.jpg", "picture"),
    MakeFile("IMG_0755.jpg", "picture"),
    MakeFile("IMG_0776.jpg", "picture"),
    MakeFile("IMG_0782.jpg", "picture"),
    MakeFile("IMG_0843.jpg", "picture"),
    MakeFile("IMG_0847.jpg", "picture"),
    MakeFile("IMG_0871.jpg", "picture"),
    MakeFile("IMG_0919.jpg", "picture"),
    MakeFile("IMG_0922.jpg", "picture"),
    MakeFile("IMG_1005.jpg", "picture"),
    MakeFile("IMG_1011.jpg", "picture"),
    MakeFile("IMG_1035.jpg", "picture"),
    MakeFile("IMG_1055.jpg", "picture"),
    MakeFile("IMG_1080.jpg", "picture"),
    MakeFile("IMG_1093.jpg", "picture"),
    MakeFile("IMG_1257.jpg", "picture"),
    MakeFile("IMG_1492.jpg", "picture"),
    MakeFile("IMG_1586.jpg", "picture"),
    MakeFile("IMG_1853.jpg", "picture"),
    MakeFile("IMG_1906.jpg", "picture"),
];
