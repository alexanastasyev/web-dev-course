function createTable() {
    const resultElem = document.getElementsByClassName("result-block")[0];
    resultElem.innerHTML = "";

    const tableNumber = getTableNumber();

    const table = document.createElement("table");
    table.id = "tableResult";
    table.style.borderCollapse = "collapse";

    for (let i = 1; i <= tableNumber; i++) {
        const tableRow = document.createElement("tr");

        for (let j = 1; j <= i; j++) {
            const tableItem = document.createElement("td");

            if (i === 1 || i === tableNumber || j === 1 || j === i) {
                tableItem.innerText = i.toString();
            }

            if (i % 2 === 0) {
                tableItem.className = "table-item-blue";
            } else {
                tableItem.className = "table-item-red";
            }
            tableRow.appendChild(tableItem);
        }

        for (let j = i + 1; j <= tableNumber; j++) {
            const tableItem = document.createElement("td");
            tableRow.appendChild(tableItem);
        }

        table.appendChild(tableRow);
    }

    resultElem.appendChild(table);

    document.getElementsByClassName("extra-buttons")[0].style.visibility = "visible";

}

function getTableNumber() {
    const tableNumberElem = document.getElementsByName("tableNumber")[0];
    let tableNumber = Math.floor(Number(tableNumberElem.value));

    if (tableNumber < 1) {
        tableNumber = 1;
    }
    if (tableNumber > 50) {
        tableNumber = 50;
    }

    tableNumberElem.value = tableNumber.toString();

    return tableNumber;
}

function removeRows() {
    const sum = getRemoveSum();

    const table = document.getElementById("tableResult");
    const tableRows = table.rows;

    let i = 0;
    while (i < tableRows.length) {
        let rowSum = 0;
        const rowItems = tableRows[i].cells;

        for (let j = 0; j < rowItems.length; j++) {
            rowSum += Number(rowItems[j].innerText);
        }
        if (rowSum < sum) {
            tableRows[i].remove();
            i--;
        }

        i++;
    }
}

function getRemoveSum() {
    const sumElem = document.getElementsByName("sumForRemove")[0];
    const sum = Math.floor(Number(sumElem.value));
    sumElem.value = sum.toString();
    return sum;
}

function findSum() {
    const table = document.getElementById("tableResult");

    const tableRows = table.rows;
    let sum = 0;

    for (let i = 0; i < tableRows.length; i++) {
        const rowItems = tableRows[i].cells;
        for (let j = 0; j < rowItems.length; j++) {
            sum += Number(rowItems[j].innerText);
        }
    }

    sum = Math.round((sum + Number.EPSILON) * 100) / 100;

    writeToBlueNumericCells(sum);
}

function findAverage() {
    const table = document.getElementById("tableResult");

    const tableRows = table.rows;
    let sum = 0;
    let amount = 0;

    for (let i = 0; i < tableRows.length; i++) {
        const rowItems = tableRows[i].cells;
        for (let j = 0; j < rowItems.length; j++) {
            if (!isBlank(rowItems[j].innerText)) {
                sum += Number(rowItems[j].innerText);
                amount++;
            }
        }
    }

    const average = Math.round(((sum / amount) + Number.EPSILON) * 100) / 100;

    writeToBlueNumericCells(average);
}

function writeToBlueNumericCells(text) {
    const table = document.getElementById("tableResult");
    const tableRows = table.rows;

    for (let i = 0; i < tableRows.length; i++) {
        const rowItems = tableRows[i].cells;
        for (let j = 0; j < rowItems.length; j++) {
            if (rowItems[j].className === "table-item-blue" && !isBlank(rowItems[j].innerText)) {
                rowItems[j].innerText = text.toString();
            }
        }
    }
}

function flipTable() {
    const table = document.getElementById("tableResult");
    const tableRows = table.rows;

    for (let i = 0; i < tableRows.length; i++) {
        const newRow = document.createElement("tr");
        const rowItems = tableRows[i].cells;
        for (let j = rowItems.length - 1; j >= 0; j--) {
            newRow.appendChild(rowItems[j]);
        }
        tableRows[i].innerHTML = newRow.innerHTML;
    }

}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}