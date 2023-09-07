"use strict";

import { addLine } from "../helpers.js";

/**
 * TODO: Rework and maybe simplify a bit? (For example introduce
 *       Map for operators, that save a class instance of operators,
 *       which could lead to fewer functions (since it'd be methods))
 * TODO: Rewrite operator-to-stack-adding-while-loop
 * TODO: Add support for non-integer input values
 * TODO: Add support for negative-value numbers
 * TODO: Add proper handling for invalid tokens/characters
 * TODO: Add support for pow with ^ (or similar) from inputline
 */

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
 *
 * @link https://en.wikipedia.org/wiki/Shunting_yard_algorithm
 * @link https://seanlhlee.gitbooks.io/acosa/content/gitBook/Algorithms/Mathematics/shunting_yard.html
 */
function parseToPostfix(input) {
    /** @type [number | "+" | "-" | "*" | "^" | "("] */
    let stack = [];
    /** @type ["+" | "-" | "*" | "^" | number] */
    let output = [];

    /** @param {[number | "+" | "-" | "*" | "/" | "^" | "("]} stack */
    let peekTop = (stack) => stack[stack.length - 1];

    let precedences = new Map([["+", 0], ["-", 0], ["/", 1], ["*", 1], ["^", 2]]);

    let token;
    while (([token, input] = getNextToken(input))[0] !== null) {
        if (typeof (token) === "number") {
            output.push(token);
            continue;
        }

        if (isParenthesis(token)) {
            if (isOpenParenthesis(token)) {
                stack.push(token);
            } else /** isCloseParenthesis */ {
                let top;
                while (!isOpenParenthesis(top = stack.pop())) {
                    output.push(top);
                }
            }
            continue;
        }

        if (isOperator(token)) {
            while (isOperator(peekTop(stack))
                    && (precedences.get(token) <= precedences.get(peekTop(stack)
                    && isLeftAssociative(token))
                    || precedences.get(token) < precedences.get(peekTop(stack)))) {
                output.push(stack.pop());
            }
            stack.push(token);
            continue;
        }
    }

    return output.concat(stack.reverse());
}

/**
 * Returns the next found token of a string
 * @param {string} input The (rest of the) string that is to be tokenized
 * @returns {[number | "+" | "-" | "*" | "^" | "(" | ")", string]} The parsed `token` and the `rest` of the string
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
        case "/": return left / right;
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
        || string === "/"
        || string === "^";
}

/**
 * Checks wether a given, one character, string is a parenthesis
 * @param {string} string Input string that might be a parenthesis
 * @returns `true` if `string` is a paranthesis, `false` if not
 */
function isParenthesis(string) {
    return isOpenParenthesis(string)
        || isClosingParenthesis(string);
}

/**
 * Checks wether a given, one character, string is an open parenthesis
 * @param {string} string Input string that might be a open parenthesis
 * @returns `true` if `string` is a paranthesis, `false` if not
 */
function isOpenParenthesis(string) {
    return string === "("
        || string === "{"
        || string === "[";
}

/**
 * Checks wether a given, one character, string is a closing parenthesis
 * @param {string} string Input string that might be a closing parenthesis
 * @returns `true` if `string` is a paranthesis, `false` if not
 */
function isClosingParenthesis(string) {
    return string === ")"
        || string === "}"
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

/**
 * Checks wether a given Operator is Left Associative
 * @param {string} string Operator that's to be checked
 * @returns `true` if `string` is Left Associative, `false` if not
 */
function isLeftAssociative(string) {
    return !isRightAssociative(string);
}

/**
 * Checks wether a given Operator is Right Associative
 * @param {string} string Operator that's to be checked
 * @returns `true` if `string` is Right Associative, `false` if not
 */
function isRightAssociative(string) {
    return string === "^";
}
