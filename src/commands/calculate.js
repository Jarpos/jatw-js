"use strict";

import { addLine } from "../helpers.js";

/**
 * My attempt to formalize the calculations I could get:
 * (to maybe make it slightly easier to write a parser?)
 *
 * <expression> ::= <expression> <operator> <expression>
 *                | "(" <expression> ")"
 *                | <number>
 *     <number> ::= <digit> <number> | <digit>
 *   <operator> ::= "*" | "+" | "-" | "/" | "%" | "^"
 *      <digit> ::= "0" | "1" | "2" | "3" | "4"
 *                | "5" | "6" | "7" | "8" | "9"
 *
 * Example for tree that could be generated out of this:
 * Calculation: (1 + 3) * 4 + 8
 * (Possible) Tree:
 *         +
 *        / \
 *       *   8
 *      / \
 *     +   4
 *    / \
 *   1   3
 *
 * Calculation: (3 * 4 + 9) * (5 + 8) * (2 * 3)
 * (Possible) Tree:
 *                 *
 *             /       \
 *            +         *
 *           / \      /   \
 *          *   9    +     *
 *         / \      / \   / \
 *        3   4    5   8 2   3
 * Effectively: (3 * 4 + 9) * ((5 + 8) * (2 * 3))
 *
 * Alternatively, I can just write the expression into its
 * Postfix notation, and then use a stack (comparable to the JVM):
 * Calculation:      (1 + 3) * 4 + 8
 * Postfix Notation: 1 3 + 4 * 8 +
 * Calculation:      (3 * 4 + 9) * (5 + 8) * (2 * 3)
 * Postfix Notation: 3 4 * 9 + 5 8 + * 2 3 * *
 *
 * Now I just need to figure out how to parse a given expression
 * into either a binary tree, or into postfix notation...
 *     Possible solution is to just implement:
 *     https://de.wikipedia.org/wiki/Shunting-yard-Algorithmus
 * But I wanna at least *try* to come up with something on my own...
 * (Although I did skim through the article, so I might come up with
 * something similar, or just give up and look it up)
 */

/**
 * Solves a given calculation e.g. `2^(5+3) * (203 + 302)`
 * @param {string[]} argv Arguments
 */
export function Calculate(argv) {
    let postfixExpression = parseToPostfix(argv.join(""));
    addLine(calculatePostfix(postfixExpression));
}

/**
 * Parses given string in infix notation, to postfix notation
 * @param {string} input Inputstring, that is to be parsed
 * @returns Parsed expression, in postfix notation, as a stack
 *
 * @example
 *   (1 + 3) * 4 + 8 => 1 3 + 4 * 8 +
 *   (3 * 4 + 9) * (5 + 8) * (2 * 3) => 3 4 * 9 + 5 8 + * 2 3 * *
 *   Note: These are possible translations, not necessarily the only ones
 *   Note: Returned form looks like this: [2, 3, "+", 34, "*"]
 */
function parseToPostfix(input) {
    let token;
    while (([token, input] = getNextToken(input))[0] !== null) {
        addLine(token);
    }
}

/**
 * Returns the next found token of a string
 * @param {string} input The (rest of the) string that is to be tokenized
 * @returns {[number | "+" | "-" | "*" | "^", string]} The parsed `token` and the `rest` of the string
 */
function getNextToken(input) {
    if (input?.length) {
        if (isOperator(input[0]) || isParenthesis(input[0])) {
            return [input[0], input.substring(1)];
        }

        if (isNumber(input[0])) {
            let i = 1
            for (; i < input.length; i++) {
                if (!isNumber(input[i])) {
                    break;
                }
            }

            return [+input.substring(0, i), input.substring(i)];
        }

        // Skips over invalid tokens (e.g. Spaces)
        return getNextToken(input.substring(1));
    }

    return [null, null];
}

/**
 * Calculates a result, from the given term, in postfix notation, as an array
 * @param {(string | number)[]} expression
 *     Expression, in postfix notation, as a "Stack" (array in JS)
 * @returns The result of the calculation
 */
function calculatePostfix(expression) {
    /** @type {number[]} */
    let stack = [];

    /** @type {number | string} */
    let current;
    while (current = expression.shift()) {
        switch (typeof (current)) {
            case "number": {
                stack.push(current);
                break;
            }

            case "string": {
                stack.push(calculateGiven(current, stack.pop(), stack.pop()));
                break;
            }
        }
    }

    return stack.join(" ");
}

/**
 * Performs a simple calculation with the given operator
 * @param {"+" | "-" | "*" | "^"} operator Operator for the given input
 * @param {number} right Number that's "right" on the stack
 * @param {number} left Number that's "left" on the stack
 * @returns The end result for the given calculation
 *
 * @example
 *   [5, 9, "+"] = 14
 *   [2, 1, "-"] = 1
 *   [4, 2, "*"] = 8
 *   [3, 2, "^"] = 9
 */
function calculateGiven(operator, right, left) {
    switch (operator) {
        case "+": return left + right;
        case "-": return left - right;
        case "*": return left * right;
        case "^": return Math.pow(left, right);
        default:
            throw new SyntaxError(
                `Operator "${operator}" is unknown and can't be used in a calculation`);
    }
}

/**
 * Checks wether a given, one character, string is an operator
 * @param {string} string Input string that might be an operator
 * @returns `true` if `string` is a operator, `false` if not
 */
function isOperator(string) {
    return string === "+"
        || string === "-"
        || string === "*"
        || string === "^";
}

/**
 * Checks wether a given, one character, string is an operator
 * @param {string} string Input string that might be a parenthisis
 * @returns `true` if `string` is a paranthesis, `false` if not
 */
function isParenthesis(string) {
    return string === "("
        || string === ")"
        || string === "{"
        || string === "}"
        || string === "["
        || string === "]";
}

/**
 * Checks wether a given, one character, string is a number
 * @param {string} string Input string that might be a number
 * @returns `true` if `string` is a number, `false` if not
 */
function isNumber(string) {
    return string === "0"
        || string === "1"
        || string === "2"
        || string === "3"
        || string === "4"
        || string === "5"
        || string === "6"
        || string === "7"
        || string === "8"
        || string === "9";
}
