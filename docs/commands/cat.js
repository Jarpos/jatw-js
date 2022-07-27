"use strict";

/**
 * Concatenate files and print on the standard output
 * @param {string[]} argv Arguments
 */
function Cat(argv) {
    if (argv?.length >= 1) {
        const file = cwd.children.find(f => f.name === argv[0]);
        if (file?.type === FILE_TYPE.TEXT) {
            for (const line of file.content) {
                addLine(line);
            }
        } else {
            if (!file) {
                addLine("Could not find file: ", argv[0]);
            } else {
                addLine(argv[0], " is not a textfile");
            }
        }
    } else {
        addLine("Error: You need to provide an input file");
    }
}
