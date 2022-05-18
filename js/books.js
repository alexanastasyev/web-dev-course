let books = [];

function generateBooks() {
    removeFilter();

    books.length = 0;

    const booksNumber = getBooksNumber();

    for (let i = 0; i < booksNumber; i++) {
        books[i] = generateRandomBook();
    }

    updateTable(books);
    document.getElementById("functionsTable").hidden = false;
}

function updateTable(books) {
    const resultElem = document.getElementsByClassName("result-block")[0];
    resultElem.innerHTML = "";
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
        genre: randomFromArray(["Роман", "Детектив", "Фантастика", "Экшен", "Приключения", "Детское"]),
        publishDate: randomDate(new Date(1700, 0, 1), new Date()),
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
    const titles1 = ["Завоевание", "Поход", "Приключения", "Жизнеопсиание", "История", "Особенности", "Смысл", "Предсказания"];
    const titles2 = ["отважных", "странных", "юных", "весёлых", "дружных", "опасных", "международных", "мрачных", "новых"];
    const titles3 = ["программистов", "студентов", "ослов", "греков", "островитян", "джентельменов", "переговоров", "палачей", "замков"];

    return randomFromArray(titles1) + " " + randomFromArray(titles2) + " " + randomFromArray(titles3);
}

function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomIntFromInterval(min, max) {
    if (min > max) {
        const temp = min;
        min = max;
        max = temp;
    }
    return Math.floor(Math.random() * (max - min + 1) + min)
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
    if (books[0].hasOwnProperty("age")) {
        addTableHeader(tableHead, "Age");
    }

    table.appendChild(tableHead);

    const tableBody = document.createElement("tbody");

    books.forEach(book => {
        const tableRow = document.createElement("tr");
        addTableItem(tableRow, book.title);
        addTableItem(tableRow, book.genre);
        addTableItem(tableRow, formatDate(book.publishDate));
        addTableItem(tableRow, book.instancesNumber);
        addTableItem(tableRow, book.author.lastName + " " + book.author.firstName + " " + book.author.patronymic);
        addTableItem(tableRow, book.pages ? book.pages : "-");
        if (book.hasOwnProperty("age")) {
            addTableItem(tableRow, book.age);
        }

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

    if (date.getDate() < 10) {
        result += "0";
    }
    result += date.getDate();
    result += ".";

    if (date.getMonth() + 1 < 10) {
        result += "0";
    }
    result += date.getMonth() + 1;
    result += ".";

    result += date.getFullYear();

    return result;
}

function authorClicked() {
    hideAllFiltering();
    document.getElementById("filterAuthor").checked = true;
    document.getElementById("authorFilterBlock").hidden = false;
    document.getElementById("filterButton").hidden = false;
}

function genreClicked() {
    hideAllFiltering();
    document.getElementById("filterGenre").checked = true;
    document.getElementById("genreFilterBlock").hidden = false;
    document.getElementById("filterButton").hidden = false;
}

function yearClicked() {
    hideAllFiltering();
    document.getElementById("filterYear").checked = true;
    document.getElementById("yearsFilterBlock").hidden = false;
    document.getElementById("filterButton").hidden = false;
}

function noFilterClicked() {
    hideAllFiltering();
    document.getElementById("filterNo").checked = true;
    updateTable(books);
}

function hideAllFiltering() {
    document.getElementById("filterAuthor").checked = false;
    document.getElementById("filterGenre").checked = false;
    document.getElementById("filterYear").checked = false;
    document.getElementById("filterNo").checked = false;

    document.getElementById("authorFilterBlock").hidden = true;
    document.getElementById("genreFilterBlock").hidden = true;
    document.getElementById("yearsFilterBlock").hidden = true;

    document.getElementById("filterButton").hidden = true;
}

function filterBooks() {
    if (document.getElementById("filterAuthor").checked) {
        filterByAuthor();
    }
    if (document.getElementById("filterGenre").checked) {
        filterByGenre();
    }
    if (document.getElementById("filterYear").checked) {
        filterByYears();
    }
}

function filterByAuthor() {
    const search = document.getElementsByName("authorLastName")[0].value;
    const filteredBooks = books.filter(book => book.author.lastName.toLowerCase().includes(search.toLowerCase().trim()));
    updateTable(filteredBooks);
}

function filterByGenre() {
    const genre = document.getElementsByName("genreSelected")[0].value;
    const filteredBooks = books.filter(book => book.genre === genre);
    updateTable(filteredBooks);
}

function filterByYears() {
    const yearFrom = getYearFrom();
    const yearTo = getYearTo();
    const filteredBooks = books.filter(book =>
        book.publishDate.getFullYear() >= yearFrom && book.publishDate.getFullYear() <= yearTo
    );
    updateTable(filteredBooks);
}

function getYearFrom() {
    return getYearFromElem("yearFrom");
}

function getYearTo() {
    return getYearFromElem("yearTo");
}

function getYearFromElem(name) {
    const yearElem = document.getElementsByName(name)[0];
    let year = Math.floor(Number(yearElem.value));

    if (year < 0) {
        year = 0;
    }
    if (year > 2050) {
        year = 2050;
    }

    yearElem.value = year.toString();

    return year;
}

function removePages() {
    removeFilter();

    const pagesNumber = getPagesNumber();
    books.forEach(book => {
        if (book.pages < pagesNumber) {
            delete book.pages;
        }
    });
    updateTable(books);
}

function removeFilter() {
    hideAllFiltering();
    document.getElementById("filterNo").checked = true;
}

function getPagesNumber() {
    const pagesElem = document.getElementsByName("pagesNumber")[0];
    let pages = Math.floor(Number(pagesElem.value));

    if (pages < 0) {
        pages = 0;
    }

    pagesElem.value = pages.toString();

    return pages;
}

function showAges() {
    removeFilter();

    books.map(book => book.age = calculateAge(book.publishDate));
    updateTable(books);
}

function calculateAge(from) {
    let ageDifMs = Date.now() - from;
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getFullYear() - 1970);
}

function getJSON() {
    let json = (JSON.stringify(books));

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json));
    element.setAttribute('download', 'books_json.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function uploadJSON() {
    let file = document.getElementById("input-file").files[0];
    readFileContent(file).then(content => {
        let newBooks = JSON.parse(content.toString());
        newBooks.forEach(book => {
            book.publishDate = new Date(book.publishDate.toString());
        });
        books = newBooks;
        updateTable(books);
    }).catch(error => console.log(error))
}

function readFileContent(file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
    })
}