function gameListLoad() {
    // Get the element by its ID
    let list = document.getElementById('gameList');

    // Toggle the display property
    if (list.style.opacity === "1") {
        list.style.opacity = "0";
    } else {
        list.style.opacity = "1";
    }
}