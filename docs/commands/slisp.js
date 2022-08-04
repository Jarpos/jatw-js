"use strict";

/**
 * Opens the sLisp interpreter on the cmdline, interprets a given expression,
 * or interprets a File_c given as an argument (can also print help)
 * @param {string[]} argv Arguments
 */
function sLisp(argv) {
    if (argv.length === 0) {
        addLine();
        addLine("******************************************");
        addLine("*                                        *");
        addLine("*   Simple List Processing Interpreter   *");
        addLine("*                                        *");
        addLine("*   This is just a simple interpreter    *");
        addLine("*   inspired by the lisp programming     *");
        addLine("*   language and this blog article:      *");
        addLine("*   https://stopa.io/post/265            *");
        addLine("*                                        *");
        addLine("*   See slisp --help for more info       *");
        addLine("*                                        *");
        addLine("******************************************");
        enterhandler = sLispEnterHandler;
        newCurrentline();
        currentline.info.innerHTML = "> ";
    } else if (argv.length === 1 && argv[0] === "--help") {
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
    if (enterhandler === sLispEnterHandler) {
        currentline.info.innerHTML = "> ";
    }
}

/**
 * "Parses" input to SLisp expression
 * @param {string} input Input to parse
 *
 * @TODO Figure out the proper terms to use for "parsing" and other
 * @TODO Actually parse the input, instead of just converting JSON data...
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
 */
function evaluateSLispExpression(expression) {
    if (Array.isArray(expression)) {
        const [fname, ...args] = expression;
        return slispfunctions.get(fname).fnc(...args.map(arg => evaluateSLispExpression(arg)));
    } else {
        return expression; // It's a primitive
    }
}

/**
 * Functions for slisp
 */
const slispfunctions = new Map([
    ["print", { fnc: (...args) => args.forEach(a => addLine(a)), h: "Prints given inputs" }],

    ["+", { fnc: (...args) => args.reduce((acc, arg) => acc + +arg), h: "Adds given inputs" }],
    ["-", { fnc: (...args) => args.reduce((acc, arg) => acc + +arg) * -1, h: "Subtracts given inputs" }],
    ["*", { fnc: (...args) => args.reduce((acc, arg) => acc * +arg), h: "Multiply given inputs" }],
    ["/", { fnc: (...args) => args.reduce((acc, arg) => acc / +arg), h: "Divide given inputs" }],
    ["^", { fnc: (...args) => args.reduce((acc, arg) => Math.pow(acc, arg)), h: "Raises number to given powers" }],

    ["exit", {
        fnc: () => {
            enterhandler = defaultEnterHandler;
            addLine();
        },
        h: "Exits slisp interpreter"
    }],
]);
