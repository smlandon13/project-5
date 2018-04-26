"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function displayClassName(target) {
    console.log("class name: " + target.name);
}
exports.displayClassName = displayClassName;
function displayClassNameWithPurpose(purpose) {
    return function (target) {
        console.log("class name: " + target.name + ", purpose: " + purpose);
    };
}
exports.displayClassNameWithPurpose = displayClassNameWithPurpose;
