"use strict";

/**
 * Yes, there shouldn't be this many file types, but I'm
 * not about to implement a checker for magic numbers or smth like that.
 */
const FILE_TYPE = {
    PICTURE: "picture",
    TEXT: "text",
}

class Folder_c {
    /**
     * Folder object constructor (Children should be added after object creation)
     * @param {string} n Name of the folder
     *
     * @example
     * (new Folder_c("folder")).addChildren(
     *     new File_c(FILE_TYPE.TEXT, "File1.txt", ["Hello", "Line 2"]),
     *     (new Folder_c("another_folder")).addChildren(
     *         new File_c(FILE_TYPE.PICTURE, "IMG_042.jpg", "files/pictures/IMG_042.jpg"),
     *         new File_c(FILE_TYPE.TEXT, "File2.txt", ["Testfile"]),
     *     ),
     * ),
     */
    constructor(n) {
        /** @type string */
        this.name = n;

        /** @type Folder_c */
        this.parent = null;

        /** @type File_c[] */
        this.children = [];
    }

    /**
     * Add content to folder (children)
     * @param  {...File_c | ...Folder_c} children Children to add
     * @returns this to be able to make fs initialization easier
     */
    addChildren(...children) {
        this.children = this.children.concat(children);
        for (const child of this.children) {
            child.parent = this;
        }
        return this;
    }

    /**
     * Remove items from children by name
     * @param  {...string} names Names of items to be deleted
     */
    removeChildren(...names) {
        this.children = this.children.filter(f => names.find(n => n === f.name) === undefined);
    }

    /**
     * Check wether this is a directory or not
     * @returns `true` or `false` wether the file is a directory
     */
    isDir() { return true; }
}

class File_c {
    /**
     * File object constructor, beware of the relation between FILE_TYPE (t) and content (c)
     * @param {string} t Filetype - See: FILE_TYPE
     * @param {string} n Filename
     * @param {string[] | string} c Content of file (or link to file on actual fs)
     *
     * @example
     * const picture = File_c(FILE_TYPE.PICTURE, "IMG_042.jpg", "files/pictures/IMG_042.jpg");
     * const text = File_c(FILE_TYPE.TEXT, "Hello.txt", ["Heya! :3", "Nice to meet'cha!"]);
     */
    constructor(t, n, c) {
        /** @type string (FILE_TYPE) */
        this.type = t;

        /** @type string */
        this.name = n;

        /** @type string[] | string */
        this.content = c;
    }

    /**
     * Check wether this is a directory or not
     * @returns `true` or `false` wether the file is a directory
     */
    isDir() { return false; }
}

/**
 * Finds files that satifisy the given condition in the given folder and its subfolders
 * @param {function (File_c): boolean} constraint constraint for which files are returned
 * @param {Folder_c} curfolder Folder to start search in defaults to `fileroot`
 * @param {(File_c | Folder_c)[]} foundfiles Files that were already found
 * @returns Found files
 *
 * @TODO Maybe use `Tree` utility function
 */
 function findFiles(constraint, curfolder = fileroot, foundfiles = []) {
    for (const file of curfolder.children) {
        if (file.isDir()) {
            findFiles(constraint, file, foundfiles);
        } else {
            if (constraint(file)) {
                foundfiles.push(file);
            }
        }
    }
    return foundfiles;
}
