function sendMail(){var e="mailto:monotoniakiller@icloud.com?subject="+escape(document.getElementById("subject").value)+"&body="+escape(document.getElementById("body").value)+" Sent from "+escape(document.getElementById("name").value);window.location.href=e}if(window.innerWidth>!1){var logo=document.querySelector(".logo");logo.setAttribute("href","#"),logo.addEventListener("click",openMenu);var menuCount=0;function openMenu(){const e=document.querySelector(".nav"),t=document.getElementById("nav-gal"),n=document.getElementById("nav-mus"),o=document.getElementById("nav-con");0==menuCount?(e.style.height="15rem",t.style.top="0",n.style.top="0",o.style.top="0",t.addEventListener("click",function(){location.href="gallery.html"}),n.addEventListener("click",function(){location.href="musil.html"}),o.addEventListener("click",function(){location.href="contact.html"}),menuCount++,console.log(menuCount)):(e.style.height="0",t.style.top="-5rem",n.style.top="-10rem",o.style.top="-15rem",menuCount=0)}}
