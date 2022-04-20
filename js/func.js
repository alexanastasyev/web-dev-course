function tabulate() {
    document.getElementsByClassName("result-block")[0].innerHTML = "";

    const xFromElem = document.getElementsByName("xFrom")[0];
    const xToElem = document.getElementsByName("xTo")[0];
    const yFromElem = document.getElementsByName("yFrom")[0];
    const yToElem = document.getElementsByName("yTo")[0];
    const aElem = document.getElementsByName("a")[0];
    const nm1Elem = document.getElementsByName("nm1")[0];
    const nm2Elem = document.getElementsByName("nm2")[0];

    let xFrom = Math.floor(Number(xFromElem.value));
    let xTo = Math.floor(Number(xToElem.value));

    let yFrom = Math.floor(Number(yFromElem.value));
    let yTo = Math.floor(Number(yToElem.value));

    const a = Number(aElem.value);

    let nm1 = Math.floor(Number(nm1Elem.value));
    let nm2 = Math.floor(Number(nm2Elem.value));

    if (nm1 < 2) {
        nm1 = 2
    }
    if (nm1 > 6) {
        nm1 = 6
    }

    if (nm2 < 2) {
        nm2 = 2
    }
    if (nm2 > 6) {
        nm2 = 6
    }

    if (xFrom > xTo) {
        let c = xFrom;
        xFrom = xTo;
        xTo = c;
    }

    if (yFrom > yTo) {
        let c = yFrom;
        yFrom = yTo;
        yTo = c;
    }

    xFromElem.value = xFrom.toString();
    xToElem.value = xTo.toString();
    yFromElem.value = yFrom.toString();
    yToElem.value = yTo.toString();
    aElem.value = a.toString();
    nm1Elem.value = nm1.toString();
    nm2Elem.value = nm2.toString();

    let min = fun(xFrom, yFrom, a, nm1, nm2);
    let max = fun(xFrom, yFrom, a, nm1, nm2);

    for (let x = xFrom; x <= xTo; x++) {
        for (let y = yFrom; y <= yTo; y++) {
            const sum = fun(x, y, a, nm1, nm2);

            if (Math.abs(sum) !== Infinity && !isNaN(sum)) {
                if (sum < min) {
                    min = sum;
                }

                if (sum > max) {
                    max = sum;
                }
            }

            const element = document.createElement("div");
            element.appendChild(document.createTextNode("f(" + x + "," + y + ") = " + sum));
            document.getElementsByClassName("result-block")[0].appendChild(element);
        }
    }

    const element = document.createElement("div");
    element.appendChild(document.createTextNode("min = " + min));
    element.appendChild(document.createTextNode("   max = " + max));
    document.getElementsByClassName("result-block")[0].appendChild(element);
}

function fun(x, y, a, nm1, nm2) {
    let sum = 0;
    if (x < a) {
        for (let n = 0; n <= nm1; n++) {
            sum += Math.pow(x, n) / (2 * Math.pow(y, n + 1) + x * n);
        }
    } else {
        for (let n = 0; n <= nm2; n++) {
            sum += (3 * x + y) / ( 3 * factorial(n) );
        }
    }
    return sum;
}

function factorial(n) {
    if (n < 0) {
        return NaN;
    }

    if (n === 0 || n === 1) {
        return 1;
    }

    let res = 1;
    for (let i = 1; i <= n; i++) {
        res *= i;
    }
    return res;
}