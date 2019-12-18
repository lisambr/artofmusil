window.onload = getData();
function getData() {
    fetch(
        "https://camelsaidwhat.com/musil_wp/wp-json/wp/v2/painting?per_page=100&_embed"
    )
        .then(e => e.json())
        .then(showPosts);
}

function showPosts(paintings) {
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

    main.appendChild(clone);
    if (window.innerWidth > 900) {
        document.getElementById(id).addEventListener("click", openDes);
    } else {
        document
            .getElementById(id)
            .parentNode.parentNode.addEventListener("click", openDes);
    }
    function openDes() {
        document.querySelector(".class" + id).classList.toggle("movetextbox");
    }
    function showPainting(onePainting) {
        var PaintImg = document.getElementById(id);
        PaintImg.setAttribute(
            "src",
            onePainting.media_details.sizes.full.source_url
        );
        var parent = PaintImg.parentNode.parentNode.parentNode;
        var imgWidth = 0;
        if (window.innerWidth > 900) {
            setTimeout(function() {
                imgWidth = document.getElementById(id).offsetWidth;
                parent.style.minWidth = " calc(" + imgWidth + "px + 18rem) ";
            }, 1000);
        } else {
            setTimeout(function() {
                imgWidth = document.getElementById(id).offsetWidth;
                parent.style.minWidth = " calc(" + imgWidth + "px - 4rem) ";
            }, 1000);
        }
    }

    //HORIZONTAL SCROLL
    counter++;
    var mainWidth = document
        .getElementById("main-gallery")
        .getBoundingClientRect();
    scrollDiv.style.minWidth = mainWidth + "px";
    scrollDiv.style.setProperty("--main-width", counter);
}

// DESKTOP VERSION

if (window.innerWidth > 900) {
    // HORIZONTAL SCROLL
    window.addEventListener("scroll", function() {
        var scrollPos = window.scrollY;
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
