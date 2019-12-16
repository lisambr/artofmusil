window.onload = getData();

function getData() {
    fetch("http://camelsaidwhat.com/musil_wp/wp-json/wp/v2/the_artist")
        .then(e => e.json())
        .then(showPosts);
}

function showPosts(des) {
    des.forEach(postDes);
}

var artist = document.querySelector(".the-artist");
var shortBox = document.querySelector(".musil-short");
var human = document.querySelector(".the-human");
var longBox = document.querySelector(".musil-long");
var artistTxt = document.querySelector(".the-artist h2");
var humanTxt = document.querySelector(".the-human h2");

artist.addEventListener("mouseenter", function() {
    shortBox.style.left = "-7%";
    artistTxt.style.transform = "translateX(-7%)";
});
artist.addEventListener("mouseleave", function() {
    shortBox.style.left = "0";
    artistTxt.style.transform = "translateX(0)";
});
artist.addEventListener("click", function() {
    shortBox.style.left = "-60%";
    artistTxt.style.transform = "translateX(-100%)";
});

human.addEventListener("mouseenter", function() {
    longBox.style.right = "-7%";
    humanTxt.style.transform = "translateX(7%)";
});
human.addEventListener("mouseleave", function() {
    longBox.style.right = "0";
    humanTxt.style.transform = "translateX(0)";
});
human.addEventListener("click", function() {
    longBox.style.right = "-60%";
    humanTxt.style.transform = "translateX(100%)";
});

function postDes(description) {
    document.getElementById("musilh3").innerHTML = description.short_des;
    document.getElementById("musilp").innerHTML = description.long_des;
}
