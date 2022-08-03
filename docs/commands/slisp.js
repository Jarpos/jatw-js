"use strict";

function sLisp(argv) {
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
}

/**
 * The enter/input handler
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function sLispEnterHandler(e) {
    const input = currentline.Input.replace(/ +/, " ");

    if (input === "(exit)") {
        enterhandler = defaultEnterHandler;
        addLine();
    } else {
        addLine(evaluateSLispExpression(parseSLispExpression(input)));
    }

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
    const functions = new Map([
        ["print", { fnc: (...args) => args.forEach(a => addLine(a)), }],
        ["+", { fnc: (...args) => args.reduce((prev, cur) => prev + +cur), }],
        ["-", { fnc: (...args) => args.reduce((prev, cur) => prev + +cur) * -1, }],

        ["exit", {
            fnc: () => {
                enterhandler = defaultEnterHandler;
                addLine();
            },
        }],
    ]);

    if (Array.isArray(expression)) {
        const [fname, ...args] = expression;
        return functions.get(fname).fnc(...args.map(arg => evaluateSLispExpression(arg)));
    } else {
        return expression; // It's a primitive
    }
}
