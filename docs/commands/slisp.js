"use strict";

function sLisp(argv) {
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
    addLine();
    enterhandler = sLispEnterHandler;
}

/**
 * The enter/input handler
 * @param {KeyboardEvent} e KeyboardEvent to process
 */
function sLispEnterHandler(e) {
    const input = currentline.Input.replace(/ +/, ", ");
    newCurrentline();

    if (input === "(exit)") {
        enterhandler = defaultEnterHandler;
    }
    // evaluateSLispExpression(parseSLispExpression(input));
}

function parseSLispExpression(input) { }

function evaluateSLispExpression(expression) { }
