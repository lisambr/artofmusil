window.onload = getData();
function getData() {
    fetch(
        "http://camelsaidwhat.com/musil_wp/wp-json/wp/v2/painting?per_page=100&_embed"
    )
        .then(e => e.json())
        .then(showPosts);
}

function showPosts(paintings) {
    console.log(paintings);
    paintings.forEach(postPaint);
}

var counter = 0;

const main = document.querySelector("main");
const scrollDiv = document.querySelector(".scroll");

function postPaint(paints) {
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);
    const title = paints.title.rendered;
    const des = paints.painting_des;
    const medium = paints.medium;
    const painting = paints.painting.guid;
    const id = paints.id;

    clone.querySelector(".painting-title").innerHTML = title;
    clone.querySelector(".painting-des").innerHTML = des;
    clone.querySelector(".painting").setAttribute("src", painting);
    clone.querySelector(".painting").setAttribute("alt", "The painting" + title);
    clone.querySelector(".painting").setAttribute("id", id);
    clone.querySelector(".box-title").innerHTML = title;
    clone.querySelector(".medium-text").innerHTML = medium;

    main.appendChild(clone);

    document.getElementById(id).addEventListener("click", function() {
        document.querySelector(".textbox").classList.toggle("movetextbox");
    })

    //HORIZONTAL SCROLL
    counter++;

    scrollDiv.style.setProperty("--main-width", counter);
}


// HORIZONTAL SCROLL
window.addEventListener("scroll", function() {
    var scrollPos = window.scrollY;
    main.style.left = "-" + scrollPos + "px";
    console.log(scrollPos);

});
