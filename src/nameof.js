"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cleanseAssertionOperators(parsedName) {
    return parsedName.replace(/[?!]/g, "");
}
function nameof(nameFunction) {
    var fnStr = nameFunction.toString();
    // ES6 class name:
    // "class ClassName { ..."
    if (fnStr.startsWith("class ")
        // Theoretically could, for some ill-advised reason, be "class => class.prop".
        && !fnStr.startsWith("class =>")) {
        return cleanseAssertionOperators(fnStr.substring("class ".length, fnStr.indexOf(" {")));
    }
    // ES6 prop selector:
    // "x => x.prop"
    if (fnStr.includes("=>")) {
        return cleanseAssertionOperators(fnStr.substring(fnStr.indexOf(".") + 1));
    }
    // ES5 prop selector:
    // "function (x) { return x.prop; }"
    // webpack production build excludes the spaces and optional trailing semicolon:
    //   "function(x){return x.prop}"
    // FYI - during local dev testing i observed carriage returns after the curly brackets as well
    var es5Match = fnStr.match(/function\s*\(\w+\)\s*\{[\r\n\s]*return\s+\w+\.((\w+\.)*(\w+))/i);
    if (es5Match) {
        return es5Match[1];
    }
    // ES5 class name:
    // "function ClassName() { ..."
    if (fnStr.startsWith("function ")) {
        return cleanseAssertionOperators(fnStr.substring("function ".length, fnStr.indexOf("(")));
    }
    // ES5 class name:
    // "function ClassName() { ..."
    if (fnStr.startsWith("function ")) {
        return cleanseAssertionOperators(fnStr.substring("function ".length, fnStr.indexOf("(")));
    }
    // Invalid function.
    throw new Error("ts-simple-nameof: Invalid function.");
}
exports.nameof = nameof;
