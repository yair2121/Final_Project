# Final_Project

Prerequisites:
JavaScript- Node JS (developed on version 14.7.6).

Installation:

1. Clone the project.
2. Change the constants defined in "/changeme.js" according to your needs.
3. In the terminal: `npm install` (for Mac users: `npm run installMac`).
4. In the terminal: `npm run build-web`.

To start the server- write: `npm run startServer`.
To enter as a client- navigate to the url defined in the file: "/changeme.js".

Writers
Roey Peleg
Yair Yardeni

## API Documentation:

Usage examples can be found in "/Backend/api_example.js".
Socket-io documentation can be found [here.](https://socket.io/docs/v4/client-socket-instance/)
To connect to the server you must include the following lines:

```
const io = require("socket.io-client");
const socket = io("http://localhost:3000/"); //Replace this with the address specified in /changeme.js
```

###### socket.emit("connect_as_api",password,callback)

**password** is meant to be used as authenticaion in case the API is not meant for everyone.
The function validating passwords `validate_password(password)` is located in /Backend/api.js and is meant to be changed according to your uses.

**callback** is a required function that accepts one argument, which is your socket id in case of a successful login, or -1 in the case of a wrong password.

###### socket.emit("connect_to_session", player_name, game_name, session_id, return_callback)

Attempts to connect you to the specified session_id.
Upon connecting successfully, you will be able recieve all relevant emits (e.g other players making moves, session ending etc.) For more information refer to the Events diagram.
**player_name** is the name you will be playing as.
**game_name** is the name of the game of the session (i.e "Crossword")
**session_id** is the id of the requested session.
**return_callback** is an optional callback function which recieves **session_id** on successful connection and -1 on unsuccessful connection.

###### socket.emit("update_move", game_name, session_id, move)

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

###### socket.emit("get_game_state", game_name, session_id, return_callback)

Returns the game_state of the requested session. You must be connected to the session to get the state.

**game_name** is the name of the game played in the session (i.e Crossword)
**session_id** is the id of the session. You must be connected to the session already!
**return_callback** is a required function which recieves the game_state as an argument upon success or the error in case of an error.

###### socket.emit("get_unready_sessions", game_name, return_callback)

Returns an array of all sessions that are playing the specified game that are not full and have not started yet.

**game_name** is the name of the game the sessions are waiting to play.
**return_callback** is a required function which recieves the return value - either the array or the error in case of one.

###### socket.emit("get_game_report", game_name, session_id, return_callback)

Returns the game report of specified ongoing session.

**game_name** is the name of the game played in the session (i.e Crossword)
**session_id** is the id of the session.
**return_callback** is a required function which recieves the return value - either the game report (JSON) or the error in case of one.

###### socket.emit("set_crossword_difficulty", difficulty, return_callback)

Sets the difficuly of Crossword (1-100). This change is server-wide and does not affect sessions that have already been created.

**difficulty** The new difficulty of Crossword.
**return_callback** is an optional function that recieves the return value - either the new difficulty or -1 if difficulty is not an integer between 1 and 100.

###### socket.emit("set_crossword_num_of_clues", num_of_clues, return_callback)

Sets the max amount of clues in Crossword (3-712). This change is server-wide and does not affect sessions that have already been created.
Numbers higher than 100 will greatly affect server-side performance.
The more clues, the larger the crossword, the slower the application becomes on the client side.

**num_of_clues** The new max amount of clues in Crossword.
**return_callback** is an optional function that recieves the return value - either the new difficulty or -1 if difficulty is not an integer between 3 and 712.

###### socket.emit("set_crossword_max_players", max_players, return_callback)

Sets the max amount of players in one game.

**num_of_clues** The new max amount of players in a Crossword game. Must be an integer larger than 0.
**return_callback** is an optional function that recieves the return value - either the new max amount of players or -1 if difficulty is not an integer larger than 0.

###### socket.emit("start_notifications")

Tells the server to notify you whenever a session is created or closed. For more information refer to the Events diagram.

###### socket.emit("end_notifications")

Tells the server to stop notifying you whenever a session is created or closed.

###### socket.emit("start_autojoin")

Tells the server to automatically put you into a session whenever it is created (if it is not full.) For more information refer to the Events diagram.

###### socket.emit("leave_autojoin")

Tells the server to stop automatically putting you into a session whenever it is created.
