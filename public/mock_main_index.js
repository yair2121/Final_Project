var socket = io();
var btn = document.getElementById("btn");

btn.addEventListener("click", function (e) {
  socket.emit("connect_to_game", "Crossword", (response) => {
    var session_id = response.session_id;
    console.log("connected to " + session_id);
    window.location.href = "/play";
  });
});

//untested primitive way to display html sent from server
//probably doesnt work and there must be a better way if this is even relevant
// socket.on("dislpay_html", function (html) {
//   document.write(html);
// });
