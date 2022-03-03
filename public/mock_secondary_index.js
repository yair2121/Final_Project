var socket = io();
var btn = document.getElementById("btn");

btn.addEventListener("click", function (e) {
  window.location.href = "/";
});

//untested primitive way to display html sent from server
//probably doesnt work and there must be a better way if this is even relevant
// socket.on("dislpay_html", function (html) {
//   document.write(html);
// });
