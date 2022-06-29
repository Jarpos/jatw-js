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

function setUpFilesystem() {
    /**
     * ~/
     * +-- pictures
     * |   |
     * |   + IMG_***.jpg
     * |
     * +-- other
     *     |
     *     + ...
     */

    const root = new Folder_c("~", null);

    const pictures = new Folder_c("pictures", root)
    pictures.addChildren(
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
    );

    const other = new Folder_c("other", root);
    other.addChildren(
        new File_c(FILE_TYPE.TEXT, "text.txt", ["Hello", "Line 2"]),

        new Folder_c("another"),
    );

    root.addChildren(pictures, other);
    return root;
}
