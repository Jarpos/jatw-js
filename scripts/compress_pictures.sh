#!/bin/bash

script_dir=$(dirname "$0")
if [ "$script_dir" = '.' ]; then
    script_dir=$(pwd)
fi

cd "$script_dir/../src/files/pictures" || exit

for i in *.png; do
    if [ ! -e "$i" ]; then
        echo "No .png found, skipping compression step"
        continue;
    fi

    o=${i%.png}.jpg

    echo "$i -> $o"
    convert $i -define jpeg:extent=175kb $o
done

rm *.png

echo
echo "Add these files to files.js:"

for f in *.jpg; do
    echo "new File_c(FILE_TYPE.PICTURE, \"$f\", \"files/pictures/$f\"),"
done
