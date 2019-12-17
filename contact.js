function sendMail() {
    var link =
        "mailto:mr.skytte@me.com" +
        "?cc=" +
        "&subject=" +
        escape(document.getElementById("subject").value) +
        "&body=" +
        escape(document.getElementById("body").value) +
        "| Sent from " +
        escape(document.getElementById("name").value);

    window.location.href = link;
}
if (window.innerWidth > !900) {
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
