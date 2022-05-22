function calculate() {
    clearPreviousResult();

    const a = getFunctionParamFromInput("paramA");
    const b = getFunctionParamFromInput("paramB");
    const h = getFunctionParamFromInput("paramH");

    if (validateParams(a, b, h)) {
        const f = applyExtraFunctions(getChosenFunction());
        const statFunctions = getChosenStatsFunctions();
        const stats = calculateStats(f, a, b, h, statFunctions);
        appendResult(createStatsTable(stats));

        // Demonstrates memoization feature
        // console.log(f.getCacheSize());
        // console.log(f.getFromCache(2)); // returns f(2)
        // console.log(f.getFromCache(20)); // returns undefined

        // Demonstrates saving calls feature
        // console.log(f.getCalls());
        // f.resetCalls();
        // console.log(f.getCalls());
    } else {
        alert("Invalid params!");
    }
}

function clearPreviousResult() {
    const resultElem = document.getElementsByClassName("result-block")[0];
    resultElem.innerHTML = "";
}

function getFunctionParamFromInput(name) {
    const elem = document.getElementsByName(name)[0];
    let value = Number(elem.value);
    elem.value = value.toString();
    return value;
}

function validateParams(a, b, h) {
    return a < b && h > 0;
}

function getChosenFunction() {
    const select = document.getElementsByName("function")[0];
    switch (select.value) {
        case "f1": return f1;
        case "f2": return f2;
        case "f3": return f3;
    }
}

function applyExtraFunctions(f) {
    if (isChecked("memoization")) {
        f = memoize(f);
    }
    if (isChecked("debug")) {
        f = debug(f);
    }
    if (isChecked("savingCalls")) {
        f = saveCalls(f);
    }
    return f;
}

function getChosenStatsFunctions() {
    const functions = [];
    if (isChecked("minimum")) {
        functions.push(findMin);
    }
    if (isChecked("positives")) {
        functions.push(findPositivesAmount);
    }
    if (isChecked("isIncreasing")) {
        functions.push(isMonotonouslyIncreasing);
    }
    return functions;
}

function isChecked(name) {
    return document.getElementsByName(name)[0].checked;
}

function calculateStats(f, a, b, h, statFunctions) {
    const result = [];
    statFunctions.forEach(func => result.push({
        "function": func.name,
        "value": func(f, a, b, h)
    }));
    return result;
}

function createStatsTable(stats) {
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    stats.forEach(stat => {
        const row = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.innerText = stat.function + ":";
        row.appendChild(td1);

        const td2 = document.createElement("td");
        td2.innerText = stat.value;
        row.appendChild(td2);

        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    return table;
}

function appendResult(value) {
    const resultElem = document.getElementsByClassName("result-block")[0];
    resultElem.appendChild(value);
}

function f1(x) {
    return x + (Math.pow(x, 3) - Math.log(x)) / (Math.sqrt(x + 5));
}

function f2(x) {
    return Math.pow((Math.sin(x)), 2) - Math.abs(5 - Math.log10(x - 4));
}

function f3(x) {
    return Math.exp(x - 2) + (Math.pow(x, 3) + 2 * x) / 4;
}

function findMin(f, a, b, h) {
    let min = Infinity;
    for (let i = a; i <= b; i += h) {
        if (isFinite(f(i)) && f(i) < min) {
            min = f(i);
        }
    }
    return min;
}

function findPositivesAmount(f, a, b, h) {
    let counter = 0;
    for (let i = a; i <= b; i += h) {
        if (f(i) > 0) {
            counter++;
        }
    }
    return counter;
}

function isMonotonouslyIncreasing(f, a, b, h) {
    for (let i = a; i <= b - h; i += h) {
        if (f(i + 1) < f(i)) {
            return false;
        }
    }
    return true;
}

function memoize(f) {
    const cache = [];
    const memoizedF = (x) => {
        if (x in cache) {
            return cache[x];
        }
        else {
            let result = f(x);
            cache[x] = result;
            return result;
        }
    };
    memoizedF.getFromCache = (x) => {
        return cache[x];
    };
    memoizedF.getCacheSize = () => {
        return cache.length;
    };
    return memoizedF;
}

function debug(f) {
    return (x) => {
        const result = f(x);
        console.log(JSON.stringify(new Date()) + "\t f(" + x + ") = " + result);
        return result;
    };
}

function saveCalls(f) {
    let calls = 0;
    const savedCallsF = (x) => {
        calls++;
        return f(x);
    }
    savedCallsF.getCalls = () => {
        return calls;
    }
    savedCallsF.resetCalls = () => {
        calls = 0;
    }
    return savedCallsF;
}