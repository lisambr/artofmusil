getData();
function getData() {
    fetch(
        "http://camelsaidwhat.com/musil_wp/wp-json/wp/v2/painting?per_page=100&_embed"
    )
        .then(e => e.json())
        .then(showPosts);
}

function showPosts(paintings) {
    console.log(paintings)
    paintings.forEach(postPaint)
}

function postPaint(paints) {
    var img = document.querySelector(".painting")
    img.setAttribute("src", paints.painting.guid)
}
