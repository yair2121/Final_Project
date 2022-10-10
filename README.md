# Final_Project

Prerequisites:
JavaScript- Node JS (developed on version 14.7.6).

Installation:

1. Clone the project.
2. Change the port (default is 3000) defined in "/Backend/index.js" according to your needs.
3. Change the address and port defined in "/Frontend/Gui/src/contexts/SocketContext" accordingly.
4. In the terminal: `npm install` (for Mac users: `npm run installMac`).
5. In the terminal: `npm run build-web`.

To start the server- write: `npm run startServer`.
To enter as a client- navigate to the url defined in the file: "/Frontend/Gui/src/contexts/SocketContext".

To change the word pool of the Crossword game, replace the file /Backend/Games/Crossword/CrosswordCluePool. The new file must have the same format, i.e JSON with the fields 1-100 that each contain an array of words of that difficulty.
Each word should follow this format:
```
{
"answer": <the word>
"clues": [array of possible definitions]
}
```
In case there is a different amount of difficulties we suggest changing /Backend/api.js:set_crossword_difficulty accordingly.

## Documentation:

#### index.js
After running `npm run startServer`, index.js is now running. index.js main job is to forward events between clients and the SessionsController. 
It initializes an instance of SessionsController (todo link to sessionscontroller part in document) and starts listening for connections from clients.
Additionally we use a dictionary, incomplete_sessions, that tracks sessions that have started but have not sent the initial game state to all particpants, since the session begins as soon as enough participants are added.

Upon client connection we initialize listeners for the following events: 
(todo links) Client logs in (chooses username,) client requests to connect to a game, client leaves a game, client attempts to login using api ([API documentation here](#api-documentation)) and client disconnects.

(todo links)
Upon client login the clients chosen username is saved.
Upon client request to join game we forward the request to SessionsController and recieve the ID of the session the client has joined.
If the session ID appears in incomplete_sessions we send the game state of the session to the client. Otherwise we simply send back the session ID.
Now that the client has joined a game we start listening for client requests to make a move.
Upon client request to make a move we forward the request to SessionsController.
When a client leaves a game or disconnects we notify the SessionsController and the other players in the game.






## API Documentation:

Usage examples can be found in "/Backend/api_example.js".
Socket-io documentation can be found [here.](https://socket.io/docs/v4/client-socket-instance/)
To connect to the server you must include the following lines:

```
const io = require("socket.io-client");
const socket = io("http://localhost:3000/"); //Replace this with the correct address 
```

#### socket.emit("connect_as_api",password,callback)

**password** is meant to be used as authenticaion in case the API is not meant for everyone.
The function validating passwords `validate_password(password)` is located in /Backend/api.js and is meant to be changed according to your uses.

**callback** is a required function that accepts one argument, which is your socket id in case of a successful login, or -1 in the case of a wrong password.

#### socket.emit("connect_to_session", player_name, game_name, session_id, return_callback)

Attempts to connect you to the specified session_id.
Upon connecting successfully, you will be able recieve all relevant emits (e.g other players making moves, session ending etc.) For more information refer to the Events diagram.
**player_name** is the name you will be playing as.
**game_name** is the name of the game of the session (i.e "Crossword")
**session_id** is the id of the requested session.
**return_callback** is an optional callback function which recieves **session_id** on successful connection and -1 on unsuccessful connection.

#### socket.emit("update_move", game_name, session_id, move)

Emits update_move as if you were a normal client. Only works if you have succesfully connected to the session using "connect_to_session".
**game_name** is the name of the game played in the session (i.e Crossword)
**session_id** is the id of the session. You must be connected to the session already!
**move** is a JSON representing the move made. There are three types of moves (in Crossword game.) Move, claim and release.
Move syntax is as follows:

```
{
    type: "move",
    body: {
        letter: <alphanumeric character>
        position: number of clue
        index: index in answer (e.g 0 for first letter, 1 for second letter etc.)
        player: index of player - your index can be found using the game_state.
    }
}
```

Claim syntax is as follows:

```
{
    type: "claim",
    body: {
        position: number of clue you wish to claim.
        player: index of player - your index can be found using the game_state.
    }
}
```

Release syntax is as follows:

```
{
    type: "release",
    body: {
        position: number of clue you wish to release.
        player: index of player - your index can be found using the game_state.
    }
}
```

You do not need to release a claim to claim another word, this is done automatically.
You must claim a word to put letters in that clue.

#### socket.emit("get_game_state", game_name, session_id, return_callback)

Returns the game_state of the requested session. You must be connected to the session to get the state.

**game_name** is the name of the game played in the session (i.e Crossword)
**session_id** is the id of the session. You must be connected to the session already!
**return_callback** is a required function which recieves the game_state as an argument upon success or the error in case of an error.

#### socket.emit("get_unready_sessions", game_name, return_callback)

Returns an array of all sessions that are playing the specified game that are not full and have not started yet.

**game_name** is the name of the game the sessions are waiting to play.
**return_callback** is a required function which recieves the return value - either the array or the error in case of one.

#### socket.emit("get_game_report", game_name, session_id, return_callback)

Returns the game report of specified ongoing session.

**game_name** is the name of the game played in the session (i.e Crossword)
**session_id** is the id of the session.
**return_callback** is a required function which recieves the return value - either the game report (JSON) or the error in case of one.

#### socket.emit("set_crossword_difficulty", difficulty, return_callback)

Sets the difficuly of Crossword (1-100). This change is server-wide and does not affect sessions that have already been created.

**difficulty** The new difficulty of Crossword.
**return_callback** is an optional function that recieves the return value - either the new difficulty or -1 if difficulty is not an integer between 1 and 100.

#### socket.emit("set_crossword_num_of_clues", num_of_clues, return_callback)

Sets the max amount of clues in Crossword (3-712). This change is server-wide and does not affect sessions that have already been created.
Numbers higher than 100 will greatly affect server-side performance.
The more clues, the larger the crossword, the slower the application becomes on the client side.

**num_of_clues** The new max amount of clues in Crossword.
**return_callback** is an optional function that recieves the return value - either the new difficulty or -1 if difficulty is not an integer between 3 and 712.

#### socket.emit("set_crossword_max_players", max_players, return_callback)

Sets the max amount of players in one game.

**num_of_clues** The new max amount of players in a Crossword game. Must be an integer larger than 0.
**return_callback** is an optional function that recieves the return value - either the new max amount of players or -1 if difficulty is not an integer larger than 0.

#### socket.emit("start_notifications")

Tells the server to notify you whenever a session is created or closed. For more information refer to the Events diagram.

#### socket.emit("end_notifications")

Tells the server to stop notifying you whenever a session is created or closed.

#### socket.emit("start_autojoin")

Tells the server to automatically put you into a session whenever it is created (if it is not full.) For more information refer to the Events diagram.

#### socket.emit("leave_autojoin")

Tells the server to stop automatically putting you into a session whenever it is created.

## Diagrams:

[For the Backend UML, Frontend chart and Events diagram click here](https://drive.google.com/drive/folders/1Ho0x0XXKMLhDKMAr7vXPNeF1AMOPyvM4?usp=sharing)

Writers
Roey Peleg
Yair Yardeni
