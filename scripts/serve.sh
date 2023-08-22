#!/bin/bash

script_dir=$(dirname "$0")
if [ "$script_dir" = '.' ]; then
    script_dir=$(pwd)
fi

python -m http.server -d $script_dir/../src/
