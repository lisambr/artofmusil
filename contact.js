// SEND MAIL FUNCTION
function sendMail() {
    var link =
        // SELECTS THE MAIL
        "mailto:monotoniakiller@icloud.com" +
        // TAKES THE INPUT OF THE SUBJECT FIELD AND PASTE IT INTO THE MAIL APP OPENING
        "?subject=" +
        escape(document.getElementById("subject").value) +
        // TAKES THE INPUT OF THE MESSAGE FIELD AND PASTE IT INTO THE MAIL APP OPENING
        "&body=" +
        escape(document.getElementById("body").value) +
        // TAKES THE INPUT OF THE NAME FIELD AND PASTE IT INTO THE END OF THE BODY
        " Sent from " +
        escape(document.getElementById("name").value);

    window.location.href = link;
}

// IF ON MOBILE DO THIS
if (window.innerWidth > !900) {
    // SAME CODE AS IN GALLERY FOR OPENING MENU ON MOBILE
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
