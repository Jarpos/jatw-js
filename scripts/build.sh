#!/bin/bash

CFLAGS="-O3 --no-entry \
        -sALLOW_MEMORY_GROWTH \
        -sMALLOC=emmalloc
        -sAUTO_JS_LIBRARIES"

script_dir=$(dirname $0)
if [ $script_dir = '.' ]; then
    script_dir=$(pwd)
fi

cd "$script_dir/../src/helpers"

emcc factorize.c -o factorize.out.wasm $CFLAGS
