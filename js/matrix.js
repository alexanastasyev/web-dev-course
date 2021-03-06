function createMatrices() {
    const resultElem = document.getElementsByClassName("result-block")[0];
    resultElem.innerHTML = "";

    const matrixSize = getMatrixSize();
    const minValue = getMinValue();
    const maxValue = getMaxValue();

    const resultTable = document.createElement("table");

    const matrix1 = generateMatrix(matrixSize, minValue, maxValue);
    const matrix2 = generateMatrix(matrixSize, minValue, maxValue);

    const table1 = generateMatrixTable(matrix1);
    const table2 = generateMatrixTable(matrix2);

    appendHeaderRow(resultTable, "Default matrices:");
    appendValueRow(resultTable, table1, table2);

    const averages1 = getAverageRowsArray(matrix1);
    const averages2 = getAverageRowsArray(matrix2);

    appendHeaderRow(resultTable, "Vectors with average row values:");
    appendValueRow(resultTable, averages1, averages2);

    const sortedAverages1 = sortArrayAsc(averages1);
    const sortedAverages2 = sortArrayDesc(averages2);

    appendHeaderRow(resultTable, "Sorted vectors:");
    appendValueRow(resultTable, sortedAverages1, sortedAverages2);

    appendHeaderRow(resultTable, "Delete values:");
    appendValueRow(resultTable, removeEvens(sortedAverages1), removeOdds(sortedAverages2));

    resultElem.appendChild(resultTable);
}

function getMatrixSize() {
    const matrixSizeElem = document.getElementsByName("matrixSize")[0];
    let matrixNumber = Math.floor(Number(matrixSizeElem.value));

    if (matrixNumber < 2) {
        matrixNumber = 2;
    }
    if (matrixNumber > 10) {
        matrixNumber = 10;
    }

    matrixSizeElem.value = matrixNumber.toString();

    return matrixNumber;
}

function getMinValue() {
    const minValueElem = document.getElementsByName("minValue")[0];
    let minValue = Math.floor(Number(minValueElem.value));
    minValueElem.value = minValue.toString();
    return minValue;
}

function getMaxValue() {
    const maxValueElem = document.getElementsByName("maxValue")[0];
    let maxValue = Math.floor(Number(maxValueElem.value));
    maxValueElem.value = maxValue.toString();
    return maxValue;
}

function generateMatrix(size, from, to) {
    return Array.from({length: size}, () =>
        Array.from({length: size}, () => randomIntFromInterval(from, to))
    );
}

function generateMatrixTable(matrix) {
    const table = document.createElement("table");
    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement("tr")
        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement("td");
            cell.innerText = matrix[i][j].toString();
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    return table;
}

function randomIntFromInterval(min, max) {
    if (min > max) {
        const temp = min;
        min = max;
        max = temp;
    }
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getAverageRowsArray(matrix) {
    const averages = [];
    matrix.map((value, index) => averages[index] = round2Digits(findAverage(value)));
    return averages;
}

function findAverage(array) {
    return array.reduce((a, b) => a + b) / array.length;
}

function appendHeaderRow(table, text) {
    const row = document.createElement("tr");
    row.innerText = text;
    table.appendChild(row);
}

function appendValueRow(table, valueLeft, valueRight) {
    const row = document.createElement("tr");
    appendCell(valueLeft, row);
    appendCell(valueRight, row);
    table.appendChild(row);
}

function appendCell(value, row) {
    const cell = document.createElement("td");
    cell.style.paddingRight = "50px";
    cell.style.paddingTop = "15px";
    cell.style.paddingBottom = "15px";
    if (isNode(value)) {
        cell.appendChild(value);
    } else {
        cell.innerText = value;
    }
    row.appendChild(cell);
}

function isNode(object){
    return (
        typeof Node === "object" ? object instanceof Node :
            object && typeof object === "object" && typeof object.nodeType === "number" && typeof object.nodeName==="string"
    );
}

function sortArrayAsc(array) {
    return sortArray(array, true);
}

function sortArrayDesc(array) {
    return sortArray(array, false);
}

function sortArray(array, asc) {
    if (asc) {
        array.sort((a, b) => a - b);
    } else {
        array.sort((a, b) => b - a);
    }
    return array;
}

function removeEvens(array) {
    return array.filter(value => Math.trunc(value) % 2 !== 0);
}

function removeOdds(array) {
    return array.filter(value => Math.trunc(value) % 2 === 0);
}

function round2Digits(number) {
    return Math.round(number * 100) / 100;
}