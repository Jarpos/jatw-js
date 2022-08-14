"use strict";

/**
 * Opens the sLisp interpreter on the cmdline, interprets a given expression,
 * or interprets a File_c given as an argument (can also print help)
 * @param {string[]} argv Arguments
 */
function sLisp(argv) {
    if (argv.length === 0) {
        addLine();
        addLine("* * * * * * * * * * * * * * * * * * * * * *");
        addLine("*                                         *");
        addLine("*   Simple List Processing Interpreter    *");
        addLine("*                                         *");
        addLine("*   This is just a simple interpreter     *");
        addLine("*   inspired by the lisp programming      *");
        addLine("*   language and this blog article:       *");
        addLine("*   https://stopa.io/post/265             *");
        addLine("*                                         *");
        addLine("*   See slisp --help for more info        *");
        addLine("*                                         *");
        addLine("* * * * * * * * * * * * * * * * * * * * * *");
        enterhandler = sLispEnterHandler;
        inputlineinfohandler = () => "> ";
        newCurrentline();
    } else if (argv.length === 1 && (argv[0] === "--help" || argv[0] === "-h")) {
        addLine();
        addLine("Supported Instructions:");
        for (const [key, value] of slispfunctions.entries()) {
            addLine("    ", key.padEnd(10), value.h);
        }
        addLine();
        addLine('Examples:');
        addLine('    > ["+", 5, 20, ["-", 10, 5 ]]');
        addLine('    10');
        addLine('    > ["+", 15, 20, ["-", 10, 5, 5, 15 ]]');
        addLine('    0');
        addLine('    > ["/", ["*", 3, 3, ["+", 1, 1 ]], 2, 2 ]');
        addLine('    4.5');
        addLine('    > ["^", 3, 2, 2]');
        addLine('    81');
        addLine('    > ["print", 15, "Hello!"]');
        addLine('    15');
        addLine('    Hello!');
        addLine('    > ["do", ["run", "cd", "pictures"], ["run", "ls"]]');
        addLine('    IMG_0121.jpg     IMG_0416.jpg     IMG_0428.jpg     IMG_0529.jpg     IMG_0531.jpg');
        addLine('    IMG_0591.jpg     IMG_0593.jpg     IMG_0701.jpg     IMG_0755.jpg     ...');
        addLine();
    }
}

/**
 * The enter/input handler
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function sLispEnterHandler(e) {
    addLine(evaluateSLispExpression(parseSLispExpression(currentline.Input)));
    newCurrentline();
}

/**
 * "Parses" input to SLisp expression
 * @param {string} input Input to parse
 *
 * @TODO Figure out the proper terms to use for "parsing" and other
 * @TODO Actually parse the input, instead of just converting JSON data...
 * @returns {[]} Tries to parse the given input to a slisp expression
 */
function parseSLispExpression(input) {
    return JSON.parse(
        input.replaceAll(/ +/g, " ")
            .replaceAll("(", "[")
            .replaceAll(")", "]")
            .replaceAll("[", " [ ")
            .replaceAll("]", " ] ")
    );
}

/**
 * Evaluate ("execute") SLisp expression
 * @param {any[]} expression Expression that is to be evaluated
 *
 * @TODO Add support for variables
 */
function evaluateSLispExpression(expression) {
    if (Array.isArray(expression)) {
        // It's another expression
        const [fname, ...args] = expression;
        return slispfunctions.get(fname).f(...args.map(arg => evaluateSLispExpression(arg)));
    } else {
        // It's a primitive
        return expression;
    }
}

/**
 * Supported functions for slisp with a short explanation
 *
 * @TODO Add more functions
 * @TODO Add functions for conditionals
 */
const slispfunctions = new Map([
    ["print", { f: (...args) => args.forEach(a => addLine(a)), h: "Prints given inputs" }],

    ["+", { f: (...args) => args.reduce((acc, arg) => acc + +arg), h: "Adds given inputs" }],
    ["-", { f: (...args) => args.reduce((acc, arg) => acc + +arg) * -1, h: "Subtracts given inputs" }],
    ["*", { f: (...args) => args.reduce((acc, arg) => acc * +arg), h: "Multiply given inputs" }],
    ["/", { f: (...args) => args.reduce((acc, arg) => acc / +arg), h: "Divide given inputs" }],
    ["^", { f: (...args) => args.reduce((acc, arg) => Math.pow(acc, arg)), h: "Raises number to given powers" }],

    ["OR", { f: (...args) => args.reduce((acc, arg) => acc | +arg), h: "Logical or operation" }],
    ["AND", { f: (...args) => args.reduce((acc, arg) => acc & +arg), h: "Logical and operation" }],
    ["XOR", { f: (...args) => args.reduce((acc, arg) => acc ^ +arg), h: "Exclusive or operation" }],

    ["do", {
        f: (...args) => args.forEach(arg => addLine(evaluateSLispExpression(arg))),
        h: "Evaluates slisp expressions passed in args"
    }],
    ["run", {
        f: (...args) => commands.get(args[0]).cmd(args.slice(1)),
        h: "Runs given command (1st arg), with given arguments (rest of args)"
    }],

    ["exit", {
        f: () => {
            enterhandler = defaultEnterHandler;
            inputlineinfohandler = defaultInputLineInfoHandler;
            addLine();
        },
        h: "Exits slisp interpreter"
    }],
]);
