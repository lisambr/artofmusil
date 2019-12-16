function sendMail() {
         var link = "mailto:mr.skytte@me.com"
         + "?cc="
         + "&subject=" + escape(document.getElementById("subject").value)
         + "&body=" + escape(document.getElementById('body').value) +  "| Send from " + escape(document.getElementById("name").value);

     window.location.href = link;
 }
