// 1. Скрыть картинки. При наведении текста показывать пиктограмму. При нажатии на пиктограмму показывать картинки
// 2. Решить проблему с наслаиванием элементов при изменении ширины.

function changeBodyBgColor() {
    let elements = document.getElementsByTagName("body");

    for (let i=0, max=elements.length; i < max; i++) {
        elements[i].style.backgroundColor = getRandomColor();
    }
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}