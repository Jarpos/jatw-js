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
        evaluateSLispExpression(parseSLispExpression(input));
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

function evaluateSLispExpression(expression) { }
