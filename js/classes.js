let complex = undefined;

function initComplex() {
    const re = getNumberFromInput("partRe");
    const im = getNumberFromInput("partIm");
    complex = new Complex(re, im);
    updateCurrent();
}

function actionToString() {
    if (!complex) {
        showError();
        return;
    }
    updateResult(complex.toString());
}

function actionGetReal() {
    if (!complex) {
        showError();
        return;
    }
    updateResult(complex.getReal());
}

function actionSetReal() {
    if (!complex) {
        showError();
        return;
    }
    const newRe = getNumberFromInput("newRe");
    complex.setReal(newRe);
    updateCurrent();
    updateResult("Success.");
}

function actionGetImaginary() {
    if (!complex) {
        showError();
        return;
    }
    updateResult(complex.getImaginary());
}

function actionSetImaginary() {
    if (!complex) {
        showError();
        return;
    }
    const newRe = getNumberFromInput("newIm");
    complex.setImaginary(newRe);
    updateCurrent();
    updateResult("Success.");
}

function actionAdd() {
    if (!complex) {
        showError();
        return;
    }
    const anotherRe = getNumberFromInput("anotherReAdd");
    const anotherIm = getNumberFromInput("anotherImAdd");
    const anotherComplex = new Complex(anotherRe, anotherIm);
    const result = complex.add(anotherComplex);
    updateResult(result.toString());
}

function actionSubtract() {
    if (!complex) {
        showError();
        return;
    }
    const anotherRe = getNumberFromInput("anotherReSubtract");
    const anotherIm = getNumberFromInput("anotherImSubtract");
    const anotherComplex = new Complex(anotherRe, anotherIm);
    const result = complex.subtract(anotherComplex);
    updateResult(result.toString());
}

function actionMultiply() {
    if (!complex) {
        showError();
        return;
    }
    const anotherRe = getNumberFromInput("anotherReMultiply");
    const anotherIm = getNumberFromInput("anotherImMultiply");
    const anotherComplex = new Complex(anotherRe, anotherIm);
    const result = complex.multiply(anotherComplex);
    updateResult(result.toString());
}

function actionDivide() {
    if (!complex) {
        showError();
        return;
    }
    const anotherRe = getNumberFromInput("anotherReDivide");
    const anotherIm = getNumberFromInput("anotherImDivide");
    const anotherComplex = new Complex(anotherRe, anotherIm);
    const result = complex.divide(anotherComplex);
    updateResult(result.toString());
}

function actionAssign() {
    if (!complex) {
        showError();
        return;
    }
    const anotherRe = getNumberFromInput("anotherReAssign");
    const anotherIm = getNumberFromInput("anotherImAssign");
    const anotherComplex = new Complex(anotherRe, anotherIm);
    complex.assign(anotherComplex);
    updateCurrent();
    updateResult(complex.toString());
}

function actionPrintActions() {
    if (!complex) {
        showError();
        return;
    }
    complex.logActions();
    updateResult("See logs.");
}

function actionClearActions() {
    if (!complex) {
        showError();
        return;
    }
    complex.clearActions();
    updateResult("Success.");
}

function showError() {
    updateResult("Error! Complex number is undefined.");
}

function updateResult(text) {
    clearResult();
    writeResult(text);
}

function clearResult() {
    document.getElementsByClassName("result-block")[0].innerHTML = "";
}

function writeResult(text) {
    document.getElementsByClassName("result-block")[0].innerText = text;
}

function getNumberFromInput(name) {
    const elem = document.getElementsByName(name)[0];
    let value = Number(elem.value);
    elem.value = value.toString();
    return value;
}

function updateCurrent() {
    document.getElementById("currentComplex").innerText = complex.toString();
}

function actionChanged() {
    hideAllActions();
    const select = document.getElementsByName("action")[0];
    switch (select.value) {
        case "toString": showElem("actionToString"); break;
        case "getReal": showElem("actionGetReal"); break;
        case "setReal": showElem("actionSetReal"); break;
        case "getImaginary": showElem("actionGetImaginary"); break;
        case "setImaginary": showElem("actionSetImaginary"); break;
        case "add": showElem("actionAdd"); break;
        case "subtract": showElem("actionSubtract"); break;
        case "multiply": showElem("actionMultiply"); break;
        case "divide": showElem("actionDivide"); break;
        case "assign": showElem("actionAssign"); break;
        case "printActions": showElem("actionPrintActions"); break;
        case "resetActions": showElem("actionClearActions"); break;
    }
}

function hideAllActions() {
    hideElem("actionToString");
    hideElem("actionGetReal");
    hideElem("actionSetReal");
    hideElem("actionGetImaginary");
    hideElem("actionSetImaginary");
    hideElem("actionAdd");
    hideElem("actionSubtract");
    hideElem("actionMultiply");
    hideElem("actionDivide");
    hideElem("actionAssign");
    hideElem("actionPrintActions");
    hideElem("actionClearActions");
}

function hideElem(id) {
    document.getElementById(id).hidden = true;
}

function showElem(id) {
    document.getElementById(id).hidden = false;
}

function Complex(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;

    this.toString = () => {
        this.registerAction("toString");
        return this.real + (this.imaginary > 0 ? " + " : " - ") + Math.abs(this.imaginary) + "i";
    };
    this.getReal = () => {
        this.registerAction("getReal");
        return this.real;
    };
    this.setReal = (value) => {
        this.registerAction("setReal", value);
        this.real = value;
    };
    this.getImaginary = () => {
        this.registerAction("getImaginary");
        return this.imaginary;
    };
    this.setImaginary = (value) => {
        this.registerAction("setImaginary", value);
        this.imaginary = value;
    };
    this.add = (value) => {
        this.registerAction("add", value);
        return new Complex(this.real + value.real, this.imaginary + value.imaginary);
    };
    this.subtract = (value) => {
        this.registerAction("subtract", value);
        return new Complex(this.real - value.real, this.imaginary - value.imaginary);
    };
    this.multiply = (value) => {
        this.registerAction("multiply", value);
        const resultRe = this.real * value.real - (this.imaginary * value.imaginary);
        const resultIm = this.real * value.imaginary + value.real * this.imaginary;
        return new Complex(resultRe, resultIm);
    };
    this.divide = (value) => {
        this.registerAction("divide", value);
        if (value.real === 0 && value.imaginary === 0) {
            return NaN;
        }
        const divideRe = value.real;
        const divideIm = value.imaginary;
        const conjugate = new Complex(divideRe, -divideIm);
        const numerator = this.multiply(conjugate);
        const denominator = value.real * value.real + value.imaginary * value.imaginary;
        const resultRe = numerator.real / denominator;
        const resultIm = numerator.imaginary / denominator;
        return new Complex(resultRe, resultIm);
    };
    this.assign = (value) => {
        this.registerAction("assign", value);
        this.real = value.real;
        this.imaginary = value.imaginary;
    };
}

Complex.prototype.actions = [];
Complex.prototype.registerAction = (functionName, ...args) => {
    Complex.prototype.actions.push({
        "function": functionName,
        "time": JSON.stringify(new Date()),
        "args": args
    });
};
Complex.prototype.clearActions = () => {
    Complex.prototype.actions.length = 0;
};
Complex.prototype.logActions = () => {
    console.log(Complex.prototype.actions);
};
