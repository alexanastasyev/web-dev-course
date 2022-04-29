function createMatrices() {
    const resultElem = document.getElementsByClassName("result-block")[0];
    resultElem.innerHTML = "";

    const matrixSize = getMatrixSize();
    const minValue = getMinValue();
    const maxValue = getMaxValue();

    const resultTable = document.createElement("table");

    appendHeaderRow(resultTable, "Default matrices:");

    const matrix1 = generateMatrix(matrixSize, minValue, maxValue);
    const matrix2 = generateMatrix(matrixSize, minValue, maxValue);

    const table1 = generateMatrixTable(matrix1);
    const table2 = generateMatrixTable(matrix2);

    appendValueRow(resultTable, table1, table2);

    appendHeaderRow(resultTable, "Vectors with average row values:");

    const averages1 = getAverageRowsArray(matrix1);
    const averages2 = getAverageRowsArray(matrix2);

    appendValueRow(resultTable, averages1, averages2);

    appendHeaderRow(resultTable, "Sorted vectors:");

    const sortedAverages1 = sortArrayAsc(averages1);
    const sortedAverages2 = sortArrayDesc(averages2);

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
    const matrix = [];
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row[j] = randomIntFromInterval(from, to);
        }
        matrix[i] = row;
    }
    return matrix;
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
    matrix.map((value, index) => averages[index] = findAverage(value));
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

    const cell1 = document.createElement("td");
    cell1.style.paddingRight = "50px";
    if (isNode(valueLeft)) {
        cell1.appendChild(valueLeft);
    } else {
        cell1.innerText = valueLeft;
    }
    row.appendChild(cell1);

    const cell2 = document.createElement("td");
    cell2.style.paddingLeft = "50px";
    if (isNode(valueRight)) {
        cell2.appendChild(valueRight);
    } else {
        cell2.innerText = valueRight;
    }
    row.appendChild(cell2);

    table.appendChild(row);
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
        array.sort(function (a, b) {
            if (a > b) {
                return 1;
            } else if (a < b) {
                return -1;
            } else {
                return 0;
            }
        });
    } else {
        array.sort(function (a, b) {
            if (a > b) {
                return -1;
            } else if (a < b) {
                return 1;
            } else {
                return 0;
            }
        });
    }
    return array;
}

function removeEvens(array) {
    return array.filter(value => Math.trunc(value) % 2 !== 0);
}

function removeOdds(array) {
    return array.filter(value => Math.trunc(value) % 2 === 0);
}