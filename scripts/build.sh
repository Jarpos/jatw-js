#!/bin/bash

FILES=(
    "factorize.c"
    "animation.c"
)

# For some reason that breaks it??? -sASSERTIONS=2
# https://github.com/emscripten-core/emscripten/blob/main/src/settings.js
CFLAGS="-O3 --no-entry        \
        -sMALLOC=emmalloc     \
        -sAUTO_JS_LIBRARIES   \
        -sALLOW_MEMORY_GROWTH"

script_dir=$(dirname "$0")
if [ "$script_dir" = '.' ]; then
    script_dir=$(pwd)
fi

cd "$script_dir/../src/helpers" || exit

echo "Starting compilation with: $CFLAGS" | tr -s " "
for f in "${FILES[@]}"; do
    echo -n "[ ] Compiling ${f} to ${f%.*}.c.wasm  "
    ERROR=$(emcc "${f}" -o "${f%.*}.c.wasm" $CFLAGS 2>&1)

    if [ $? -eq 0 ]; then
        echo -e "\r[✔] Compiled ${f} to ${f%.*}.c.wasm  "
    else
        echo -e "\r[✘] Error while compiling ${f} to ${f%.*}.c.wasm"
        echo "$ERROR"
    fi
done
