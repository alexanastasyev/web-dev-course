function showBooks() {
    const resultElem = document.getElementsByClassName("result-block")[0];
    resultElem.innerHTML = "";

    const booksNumber = getBooksNumber();

    const books = [];
    for (let i = 0; i < booksNumber; i++) {
        books[i] = generateRandomBook();
    }

    const table = createTable(books);

    resultElem.appendChild(table);
}

function getBooksNumber() {
    const booksNumberElem = document.getElementsByName("booksNumber")[0];
    let booksNumber = Math.floor(Number(booksNumberElem.value));

    if (booksNumber < 1) {
        booksNumber = 1;
    }
    if (booksNumber > 100) {
        booksNumber = 100;
    }

    booksNumberElem.value = booksNumber.toString();

    return booksNumber;
}

function generateRandomBook() {
    return {
        title: generateRandomTitle(),
        genre: randomFromArray(["Роман", "Детектив", "Фантастика", "Экшн", "Приключения", "Детское"]),
        publishDate: {
            day: randomIntFromInterval(1, 30),
            month: randomIntFromInterval(1, 12),
            year: randomIntFromInterval(1700, 2022)
        },
        instancesNumber: randomIntFromInterval(1, 100000),
        author: {
            firstName: randomFromArray(["Иван", "Пётр", "Алексей", "Александр", "Илья", "Борис"]),
            lastName: randomFromArray(["Иванов", "Петров", "Алексеев", "Александров", "Ильин", "Борисов"]),
            patronymic: randomFromArray(["Иванович", "Петрович", "Алексеевич", "Александрович", "Ильич", "Борисович"])
        },
        pages: randomIntFromInterval(50, 1200)
    }
}

function generateRandomTitle() {
    const titles1 = ["Завоевание", "Поход", "Приключения", "Жизнеопсиание", "История", "Особенности"];
    const titles2 = ["отважных", "странных", "юных", "весёлых", "дружных", "опасных"];
    const titles3 = ["программистов", "студентов", "ослов", "греков", "островитян", "джентельменов"];

    return randomFromArray(titles1) + " " + randomFromArray(titles2) + " " + randomFromArray(titles3);
}

function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function createTable(books) {
    const table = document.createElement("table");
    setTableElementStyle(table);

    const tableHead = document.createElement("thead");
    setTableElementStyle(tableHead);

    addTableHeader(tableHead, "Title");
    addTableHeader(tableHead, "Genre");
    addTableHeader(tableHead, "Publish date");
    addTableHeader(tableHead, "Instances");
    addTableHeader(tableHead, "Author");
    addTableHeader(tableHead, "Pages");

    table.appendChild(tableHead);

    const tableBody = document.createElement("tbody");

    books.forEach(book => {
        const tableRow = document.createElement("tr");
        addTableItem(tableRow, book.title);
        addTableItem(tableRow, book.genre);
        addTableItem(tableRow, formatDate(book.publishDate));
        addTableItem(tableRow, book.instancesNumber);
        addTableItem(tableRow, book.author.lastName + " " + book.author.firstName + " " + book.author.patronymic);
        addTableItem(tableRow, book.pages);

        tableBody.appendChild(tableRow);
    });

    table.appendChild(tableBody);

    return table;
}

function addTableHeader(tableHead, label) {
    const header = document.createElement("th");
    header.innerText = label;
    setTableElementStyle(header);
    tableHead.appendChild(header);
}

function addTableItem(tableRow, label) {
    const tableItem = document.createElement("td");
    tableItem.innerText = label;
    setTableElementStyle(tableItem);
    tableRow.appendChild(tableItem)
}

function setTableElementStyle(element) {
    element.style.border = "1px solid";
    element.style.borderCollapse = "collapse";
    element.style.padding = "5px 10px";
}

function formatDate(date) {
    let result = "";

    if (date.day < 10) {
        result += "0";
    }
    result += date.day;
    result += ".";

    if (date.month < 10) {
        result += "0";
    }
    result += date.month;
    result += ".";

    result += date.year;

    return result;
}

function randomIntFromInterval(min, max) {
    if (min > max) {
        const temp = min;
        min = max;
        max = temp;
    }
    return Math.floor(Math.random() * (max - min + 1) + min)
}