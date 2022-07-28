"use strict";

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

/**
 * Resolve a path to a `Folder_c` or `File_c` and return the item if
 * it was found, null if the function encountered an error
 * @param {string} pathstring String that is to be resolved to a path
 * @param {Folder_c} startfolder Folder from which to begin resolving (Defaults to `cwd`)
 * @returns The end folder, or null if an error was encountered
 */
function resolvePath(pathstring, startfolder = cwd) {
    let curitem = startfolder;
    const path_fragments = pathstring.split("/");
    if (path_fragments[0] === "") {
        curitem = fileroot;
        path_fragments.shift();
    }

    let fragment;
    while ((fragment = path_fragments.shift()) !== undefined) {
        switch (fragment) {
            case ".": curitem = curitem; break;
            case "..": curitem = curitem.parent ? curitem.parent : curitem; break;
            case "": break;

            default: {
                const newitem = curitem.children.find(c => c.name === fragment);
                if (newitem?.isDir()) {
                    curitem = newitem;
                } else if (newitem && path_fragments.length === 0) {
                    return newitem;
                } else {
                    return null;
                }
            }
        }
    }

    return curitem;
}

/**
 * Get the path to a certain File or Folder
 * @param {Folder_c | File_c} f File to get the absolute path to
 * @returns The absolute path to a given File or Folder as a string
 */
 function getPath(f) {
    /**
     * Traverses up folder and returns string to it
     * @param {string} s Working Directory string
     * @param {Folder_c} f Folder to traverse up
     * @returns {string} String to working directory
     */
    const pwd = (s, f) => {
        if (f === null) {
            return s;
        }
        return pwd(f.name + "/" + s, f.parent);
    }
    return f.isDir() ? pwd("", f) : pwd("", f).slice(0, -1);
}
