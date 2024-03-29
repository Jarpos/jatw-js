# jatw-js - Just Another Terminal Website - JavaScript
Yes, I know that this is in no way a new idea or anything,
I just kinda wanted to do some frontend stuff (Also I wanted
to have a way to show off some of the pictures I've taken).

## Table of Contents
- [jatw-js - Just Another Terminal Website - JavaScript](#jatw-js---just-another-terminal-website---javascript)
  - [Table of Contents](#table-of-contents)
  - [Info](#info)
  - [Features](#features)
  - [Todo](#todo)

## Info
This is all done with vanilla [JavaScript](https://en.wikipedia.org/wiki/JavaScript),
[CSS](https://en.wikipedia.org/wiki/CSS) and [HTML](https://en.wikipedia.org/wiki/HTML),
as well as some [WASM](https://en.wikipedia.org/wiki/WebAssembly), for some of the more
processing intensive things.

## Features
- A mocked terminal with which you can interact, using commands such as:
  - `calculate` to calculate the result of a given math expression
  - `clear` to clear the screen
  - `factorize` to get the prime factors of a number
  - `help` to get all possible commands, with a short explanation
  - `reboot` to reload the site
  - `slisp` to get a simple, lisp inspired, scripting interface, or execute a given script
  - `theme` to use very simple themeing
  - `time` to time how long a command takes to execute
  - `times` to get some times printed
- A very basic, mocked, readonly "Filesystem", with:
  - `cat` command for textfiles
  - `cd` to navigate the "Filesystem"
  - `find` with RegEx
  - `ls` to list directory content
  - `tree` utility
  - `viewer` to view pictures in current folder

## Todo
- [ ] Add alt/id text for all the images
- [ ] Add a simple text editor
- [ ] Rework themeing
- [ ] Add mobile support
- [ ] Regarding `slisp`:
  - [ ] Write a parser, so the "code" isn't just JSON arrays
  - [ ] Support for variables
- [ ] Fix: `factorize x --wasm`
  - `factorize 1099999999 --wasm; factorize 1099999999 --wasm; factorize 10999999949 --wasm`
  - This throws: `RuntimeError: index out of bounds`
- Also, see: `@TODO`s in the code
