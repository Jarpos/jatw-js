// Mock file system

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
     * Folder object constructor
     * @param {string} n Name of the folder
     * @param {Folder_c} p Parent of current folder
     */
    constructor(n, p) {
        this.name = n;
        this.parent = p;

        /**
         * @type File_c[]
         */
        this.children = [];
    }

    /**
     * Add content to folder (children)
     * @param  {...File_c | ...Folder_c} children Children to add
     */
    addChildren(...children) {
        this.children = this.children.concat(children);
        for (const child of this.children) {
            child.parent = this;
        }
    }

    /**
     * Remove items from children by name
     * @param  {...string} names Names of items to be deleted
     */
    removeChildren(...names) {
        this.children = this.children.filter(f => names.find(n => n === f.name) === undefined);
    }

    isDir() { return true; }
}

/**
 * Tree structure to "mock" a simple filesystem
 */
class File_c {
    /**
     * File object constructor, beware of the relation between FILE_TYPE (t) and content (c)
     * @param {string} t Filetype - See: FILE_TYPE
     * @param {string} n Filename
     * @param {string[] | string} c Content of file (or link to file on actual fs)
     *
     * @example
     *     const picture = File_c(FILE_TYPE.PICTURE, "IMG_042.jpg", "files/pictures/IMG_042.jpg");
     *     const text = File_c(FILE_TYPE.TEXT, "Hello.txt", ["Hello :3", "Nice to meet'cha!"]);
     */
    constructor(t, n, c) {
        this.type = t;
        this.name = n;
        this.content = c;
    }

    isDir() { return false; }
}
