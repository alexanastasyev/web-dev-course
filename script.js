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

function showImage() {
    const modal = document.getElementById("modalImageDiv");
    const modalImg = document.getElementById("modalImage");
    modal.style.display = "block";

    const url = window.location.href;
    let src = "";
    if (url.indexOf("android") > 0) {
        src = "img/android.png";
    } else if (url.indexOf("ios") > 0) {
        src = "img/ios.jpg";
    }
    modalImg.src = src;
}

function hideImage() {
    const modal = document.getElementById("modalImageDiv");
    modal.style.display = "none";
}

function showImageIcon() {
    const icon = document.getElementById("buttonShowImage");
    icon.style.display = "block";
}

function hideImageIcon() {
    const icon = document.getElementById("buttonShowImage");
    icon.style.display = "none";
}