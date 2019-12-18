// INIT FUNCTION TRIGGERED
window.onload = getData();

// FETCHED DATA SETS FROM THE API
function getData() {
    fetch(
        "https://camelsaidwhat.com/musil_wp/wp-json/wp/v2/painting?per_page=100&_embed"
    )
        .then(e => e.json())
        .then(showPosts);
}

// CALLS FOR A forEACH FUNCTION THAT STARTS THE FUNCTION, WHICH POPULATES THE GALLERY
function showPosts(paintings) {
    paintings.forEach(postPaint);
}

// COUNTER FOR HOW MANY PAINTINGS POSTED USED FOR CALCULATING THE TOTAL WIDTH (RELEVANT FOR THE SCROLL FUNCTION)
var counter = 0;

const main = document.querySelector("main");
const scrollDiv = document.querySelector(".scroll");

// FUNCTION THAT FILLS OUT THE HTML TEMPLATE AND APPEND IT
function postPaint(paints) {
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);
    const title = paints.title.rendered;
    const des = paints.painting_des;
    const medium = paints.medium;
    const id = paints.id;
    const mediaID = paints.painting.ID;
    // FETCHING THE IMG OF THE PAINTING WITH ANOTHER FETCH FUNCTION
    fetch("https://camelsaidwhat.com/musil_wp/wp-json/wp/v2/media/" + mediaID)
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
    // APPENDS TEMPLATE TO MAIN
    main.appendChild(clone);
    // IF OPENED ON DESKTOP EVENTLISTERNER ON TEXTBOX
    if (window.innerWidth > 900) {
        document.getElementById(id).addEventListener("click", openDes);
    } else {
        // ELSE IF OPENED ON DESKTOP EVENTLISTERNER ON TEXTBOX
        document
            .getElementById(id)
            .parentNode.parentNode.addEventListener("click", openDes);
    }
    // ADDS CLASS THAT ACTIVATES AN CSS ANIMATION THAT SHOWS THE TEXTBOXES
    function openDes() {
        document.querySelector(".class" + id).classList.toggle("movetextbox");
    }
    // ADD THE PAINTING IMG WE FETCHED EARLIER
    function showPainting(onePainting) {
        var PaintImg = document.getElementById(id);
        // IF THE IMG FILE IS TOO SMALL FOR WORDPRESS TO CREATE A MEDIUM_LARGE GRAB THE FULL SIZE
        if (!onePainting.media_details.sizes.medium_large) {
            PaintImg.setAttribute(
                "src",
                onePainting.media_details.sizes.full.source_url
            );
        } else {
            // ELSE GRAB THE MEDIUM_LARGE FILE
            PaintImg.setAttribute(
                "src",
                onePainting.media_details.sizes.medium_large.source_url
            );
        }
        // SET WIDTH OF ARTICLE WRAP IN ORDER TO CORRECTLY SPACE NO MATTER THE DIMENSIONS OF THE IMAGE
        // parentNODE SELECTS THE PARENT ELEMENT SO BELOW WE SELECT THE PARENT OF THE PARENT OF THE PARENT OF THE PAINTING ELEMENT
        var parent = PaintImg.parentNode.parentNode.parentNode;
        var imgWidth = 0;
        // IF ON DESKTOP SET IMGWIDTH + 18REM
        // THE setTIMEOUT IS THERE TO WAIT FOR THE IMAGE TO LOAD OTHERWISE THE IMGWIDTH RETURNS AS 0
        if (window.innerWidth > 900) {
            setTimeout(function() {
                imgWidth = document.getElementById(id).offsetWidth;
                parent.style.minWidth = " calc(" + imgWidth + "px + 18rem) ";
            }, 1000);
        } else {
            // ELSE IF ON MOBILE SET IMGWIDTH + 4REM
            setTimeout(function() {
                imgWidth = document.getElementById(id).offsetWidth;
                parent.style.minWidth = " calc(" + imgWidth + "px - 4rem) ";
            }, 1000);
        }
    }

    //HORIZONTAL SCROLL
    // ADDS 1 TO COUNTER EVERYTIME THE forEACH FUNCTION RUNS (FOR EVERY PAINTING)
    counter++;
    // GETS THE TOTAL WIDTH OF THE MAIN ELEMENT (CONTAINER FOR ALL PAINTINGS)
    var mainWidth = document
        .getElementById("main-gallery")
        .offsetWidth;
    // SETS THE minHEIGHT OF THE SCROLLDIV TO ENSURE THAT WE CAN SCROLL ALL THE WAY
    scrollDiv.style.minHeight = mainWidth + "px";
    // SETS THE CSS VARIABLE --MAIN-WIDTH EQUAL TO THE COUNTER MAKING THE DIV TALL ENOUGH FOR THE SCROLL TO WORK
    scrollDiv.style.setProperty("--main-width", counter);
}

// DESKTOP VERSION
// IF (WINDOW.INNERWIDTH > 900) {CODE} WORKS THE SAME WAY AS MEDIA QUERIES IN CSS
if (window.innerWidth > 900) {
    // HORIZONTAL SCROLL
    // CALLS THE FUNCTION EVERYTIME THE USER SCROLLS
    window.addEventListener("scroll", function() {
        var scrollPos = window.scrollY;
        // MOVE THE MAIN TO THE LEFT THE SAME AMOUNT
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

    document
        .querySelector(".progress")
        .addEventListener("mousedown", scrollClick);
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
        if (menuCount == 0) {
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
        } else {
            nav.style.height = "0";
            navGal.style.top = "-5rem";
            navMus.style.top = "-10rem";
            navCon.style.top = "-15rem";
            menuCount = 0;
        }
    }
}
