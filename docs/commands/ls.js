/**
 * Lists contents of directory
 * @param {string[]} argv Arguments
 */
function Ls(argv) {
    let s = "";
    for (let i = 1; i < cwd.children.length + 1; i++) {
        // addLine(file.name);
        s += cwd.children[i - 1].name + "    ";
        if (i % 5 === 0) {
            s += "\n";
        }
    }
    addLine(s);
}

/**
 * Changes directory
 * @param {string[]} argv Arguments
 */
function Cd(argv) {
    if (argv.length === 0) {
        cwd = fileroot;
    } else {
        const path_fragments = argv[0].split("/");
        console.log(path_fragments);
        if (path_fragments[0] === "") {
            cwd = fileroot;
            path_fragments.shift();
        }

        for (const fragment of path_fragments) {
            console.log(fragment);
            switch (fragment) {
                case ".": cwd = cwd; break;
                case "..": cwd = cwd.parent ? cwd.parent : cwd; break;
                case "": break;

                default: {
                    const folder = cwd.children.find(c => c.name === fragment);
                    if (folder && folder.isDir()) {
                        cwd = folder;
                    } else {
                        addLine("Error: Folder not found");
                    }
                }
            }
        }
    }
}
