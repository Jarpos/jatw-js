#!/bin/sh

FILES=(
    "factorize.c"
    "animation.c"
)
TO_FILES=(
    "factorize.c.wasm"
    "animation.c.mjs"
)
FLAGS=(
    ""
    "-sDISABLE_DEPRECATED_FIND_EVENT_TARGET_BEHAVIOR=1 -sASYNCIFY"
)
AFTER=(
    ""
    "mv animation.c.mjs animation.c.js"
)

# Figure out why: -sASSERTIONS=2 breaks it
# https://github.com/emscripten-core/emscripten/blob/main/src/settings.js
CFLAGS="-O0 --no-entry        \
        -sMALLOC=emmalloc     \
        -sAUTO_JS_LIBRARIES   \
        -sALLOW_MEMORY_GROWTH"

script_dir=$(dirname "$0")
if [ "$script_dir" = '.' ]; then
    script_dir=$(pwd)
fi

cd "$script_dir/../src/wasm/" || exit

echo "Starting compilation with: $CFLAGS" | tr -s " "
for i in ${!FILES[@]}; do
    echo -n "[ ] Compiling ${FILES[i]} to ${TO_FILES[i]} with ${FLAGS[$i]}"
    ERROR=$(emcc "${FILES[i]}" -o "${TO_FILES[i]}" $CFLAGS ${FLAGS[$i]} 2>&1)

    if [ $? -eq 0 ]; then
        echo -e "\r[✔] Compiled ${FILES[i]} to ${TO_FILES[i]} with ${FLAGS[$i]}  "
        ${AFTER[i]}
    else
        echo -e "\r[✘] Error while compiling ${FILES[i]} with ${FLAGS[$i]}"
        echo "$ERROR"
    fi
done
