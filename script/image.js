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