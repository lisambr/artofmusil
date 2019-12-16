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
    const id = paints.id;
    const mediaID = paints.painting.ID;
    fetch("http://camelsaidwhat.com/musil_wp/wp-json/wp/v2/media/" + mediaID)
        .then(e => e.json())
        .then(showPainting);

    clone.querySelector(".painting-title").innerHTML = title;
    clone.querySelector(".painting-des").innerHTML = des;
    clone
        .querySelector(".painting")
        .setAttribute("alt", "The painting" + title);
    clone.querySelector(".painting").setAttribute("id", id);
    clone.querySelector(".box-title").innerHTML = title;
    clone.querySelector(".medium-text").innerHTML = medium;
    clone.querySelector(".textbox").classList.add("class" + id);

    main.appendChild(clone);

    document.getElementById(id).addEventListener("click", function() {
        document.querySelector(".class" + id).classList.toggle("movetextbox");
    });
    function showPainting(onePainting) {
        document
            .getElementById(id)
            .setAttribute(
                "src",
                onePainting.media_details.sizes.full.source_url
            );
    }
    //    document.getElementById(id).style.width = "400px";

    //HORIZONTAL SCROLL
    counter++;

    scrollDiv.style.setProperty("--main-width", counter);
}

// HORIZONTAL SCROLL
window.addEventListener("scroll", function() {
    var scrollPos = window.scrollY;
    console.log(scrollPos);
    main.style.left = "-" + scrollPos + "px";
    var body = document.body;
    var height = body.scrollHeight - 742;
    var progress = (scrollPos / height) * 100;

    if (Math.floor(progress) <= 95) {
        document.querySelector(".progress").style.left = progress + "%";
    } else {
        progress = 95;
    }
});

var scrollPosi = 0;

document.querySelector(".progress").addEventListener("mousedown", scrollClick);
window.addEventListener("mouseup", scrollUp);

function scrollClick() {
    window.addEventListener("mousemove", moveBar);
}

function scrollUp() {
    window.removeEventListener("mousemove", moveBar);
}

function moveBar(e) {
    var mousePos = e.clientX;
    mousePos = event.clientX - 76;
    var screenWidth = document.querySelector(".progressbar").offsetWidth;
    var progress = (mousePos / screenWidth) * 100;
    if (progress >= 0) {
        if (Math.floor(progress) <= 95) {
            document.querySelector(".progress").style.left = progress + "%";
        } else {
            progress = 95;
        }
    }
    var height = document.body.scrollHeight - 742;
    scrollPosi = (progress * height) / 100;
    window.scroll(0, scrollPosi);
    main.style.left = "-" + scrollPosi + "px";
    console.log(scrollPosi);

    //        console.log((mousePos / screenWidth) * 100);
}
