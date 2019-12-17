window.onload = getData();

function getData() {
    fetch("http://camelsaidwhat.com/musil_wp/wp-json/wp/v2/the_artist")
        .then(e => e.json())
        .then(showPosts);
}

function showPosts(des) {
    des.forEach(postDes);
}

function postDes(description) {
    document.getElementById("musilh3").innerHTML = description.short_des;
    document.getElementById("musilp").innerHTML = description.long_des;
}

var artist = document.querySelector(".the-artist");
var shortBox = document.querySelector(".musil-short");
var human = document.querySelector(".the-human");
var longBox = document.querySelector(".musil-long");
var artistTxt = document.querySelector(".the-artist h2");
var humanTxt = document.querySelector(".the-human h2");



// DESKTOP VERSION

if (window.innerWidth > 900) {
artist.addEventListener("mouseenter", hoverArtist);
artist.addEventListener("mouseleave", leaveArtist);
artist.addEventListener("click", clickArtist);
human.addEventListener("mouseenter", hoverHuman);
human.addEventListener("mouseleave", leaveHuman);
human.addEventListener("click", clickHuman);

function hoverArtist() {
    shortBox.style.left = "0%";
    artistTxt.style.transform = "translateX(-7%)";
}

function leaveArtist() {
    shortBox.style.left = "10%";
    artistTxt.style.transform = "translateX(0)";
    artist.addEventListener("mouseleave", leaveArtist);
    artist.addEventListener("mouseenter", hoverArtist);
    window.removeEventListener("click", leaveArtist);
}

function clickArtist() {
    shortBox.style.left = "-40%";
    artistTxt.style.transform = "translateX(-100%)";
    artist.removeEventListener("mouseleave", leaveArtist);
    artist.removeEventListener("mouseenter", hoverArtist);
    setTimeout(artistClose, 100);
}

function artistClose() {
    window.addEventListener("click", leaveArtist);
}

function hoverHuman() {
    longBox.style.right = "0%";
    humanTxt.style.transform = "translateX(7%)";
}

function leaveHuman() {
    longBox.style.right = "10%";
    humanTxt.style.transform = "translateX(0)";
    human.addEventListener("mouseleave", leaveHuman);
    human.addEventListener("mouseenter", hoverHuman);
    window.removeEventListener("click", leaveHuman);
}

function clickHuman() {
    longBox.style.right = "-40%";
    humanTxt.style.transform = "translateX(100%)";
    human.removeEventListener("mouseleave", leaveHuman);
    human.removeEventListener("mouseenter", hoverHuman);
    setTimeout(humanClose, 100);
}

function humanClose() {
    window.addEventListener("click", leaveHuman);
}
} else {
     var logo = document.querySelector(".logo");
    logo.setAttribute("href", "#");
    logo.addEventListener("click", openMenu);
    var menuCount = 0;

    function openMenu() {
        const nav = document.querySelector(".nav");
        const navGal = document.getElementById("nav-gal");
        const navMus = document.getElementById("nav-mus");
        const navCon = document.getElementById("nav-con");
if (menuCount == 0){
        nav.style.height = "15rem";
        navGal.style.top = "0";
        navMus.style.top = "0";
        navCon.style.top = "0";
        navGal.addEventListener("click", function() {
            location.href = "gallery.html";
        });
        navMus.addEventListener("click", function() {
            location.href = "musil.html";
        });
        navCon.addEventListener("click", function() {
            location.href = "contact.html";
        });
    menuCount++;
    console.log(menuCount);
    }  else {
        nav.style.height = "0";
        navGal.style.top = "-5rem";
        navMus.style.top = "-10rem";
        navCon.style.top = "-15rem";
        menuCount = 0;
    }}
}
