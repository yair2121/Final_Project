# Final_Project

Prerequisites:
JavaScript- Node JS (developed on version 14.7.6).

Installation:
1. Clone the project.
2. Change the port (default is 3000) defined in ["/Backend/index.js"](https://github.com/yair2121/Final_Project/blob/d7f7f5edfb9adceb2dd216e1626c1dc1a9b34cce/Backend/index.js#L2) according to your needs.
3. Change the address and port defined in ["/Frontend/Gui/src/contexts/SocketContext"](https://github.com/yair2121/Final_Project/blob/d7f7f5edfb9adceb2dd216e1626c1dc1a9b34cce/Frontend/Gui/src/contexts/SocketContext.js#L3-L4) accordingly.
4. In the terminal: `npm install` (for Mac users: `npm run installMac`).
5. In the terminal: `npm run build-web`.

To start the server- write: `npm run startServer`.
To enter as a client- navigate to the url defined in the file: ["/Frontend/Gui/src/contexts/SocketContext"](https://github.com/yair2121/Final_Project/blob/d7f7f5edfb9adceb2dd216e1626c1dc1a9b34cce/Frontend/Gui/src/contexts/SocketContext.js#L4).

## Documentation:

#### index.js
After running `npm run startServer`, index.js is now running. index.js main job is to forward events between clients and the SessionsController. 
It initializes an instance of [SessionsController](#sessionscontroller) and starts listening for connections from clients.
Additionally we use a dictionary, incomplete_sessions, that tracks sessions that have started but have not sent the initial game state to all particpants, since the session begins as soon as enough participants are added.

Upon client connection we initialize listeners for the following events: 
Client logs in (chooses username,) client requests to connect to a game, client leaves a game, client attempts to login using api ([API documentation here](#api-documentation)) and client disconnects.

Upon client login the clients chosen username is saved.
Upon client request to join game we forward the request to SessionsController and recieve the ID of the session the client has joined.
If the session ID appears in incomplete_sessions we send the game state of the session to the client. Otherwise we simply send back the session ID.
Now that the client has joined a game we start listening for client requests to make a move.
Upon client request to make a move we forward the request to SessionsController.
When a client leaves a game or disconnects we notify the SessionsController and the other players in the game.
[Link to the aforementioned in the code](https://github.com/yair2121/Final_Project/blob/d7f7f5edfb9adceb2dd216e1626c1dc1a9b34cce/Backend/index.js#L87-L136)

#### SessionsController
SessionsController is responsible for managing all game session instances ([GameSessionServers](#gamesessionserver)) and forwarding events from the game sessions to the clients via index.js
Creating the session and deciding which session a client will be connected to happens in [connect_player.](https://github.com/yair2121/Final_Project/blob/d7f7f5edfb9adceb2dd216e1626c1dc1a9b34cce/Backend/sessions/SessionsController.js#L126-L145).
SessionsController stores sessions in three categories: Unready sessions, meaning not enough players are in the session, full sessions (which have not started yet) and active sessions (meaning they are running). Each session is defined by the game of the session (i.e Crossword) and a unique session id.

Whenever a client requests to connect to a game SessionsController checks if there is a session of that game that hasn't started yet and which has space for another player in it. If so, the client is added to the session. If the session is full it starts. If there are no avilable sessions, SessionsController creates a new session and adds the player to the session.

Whenever a client plays a move, index.js forwards the move to SessionsController, which then calls the actual move logic in the relevant session.

For every game session created SessionsController listens for the following events:
Session started, session became full, session ended, a move is made in the session or the sessions game state was changed.
All of these events are forwarded to the clients via index.js.

#### GameSession
GameSession is a wrapper class of a BaseGameModel (for example, [CrosswordGameModel](#crosswordgamemodel)).
It contains a BaseGameModel and a dictionary of the players in the GameSession.
When a session is full it is started - the GameSession tells the BaseGameModel to begin the game with the amount of players in the session.
When the game changes in any way (either a move is made, the game state is changed or the game ends) the GameSession forwards the event to the encapsulating GameSessionServer which in turn notifies the SessionsController.
If a player leaves the game the GameSession updates the player dictionary accordingly. Once there are 0 players in the session it will end.

#### GameSessionServer
GameSessionServer is a wrapper class of a GameSession.
It contains a GameSession as well as a database connection and an array of connected players. Each GameSessionServer has a unique session ID.
All events that GameSession emits are forwarded to SessionsController.
When a session is ended (either by the game ending naturally or by the GameSession being empty) the game report, a dictionary of all the moves made in the game, is uploaded to the database.

#### CrosswordCluePool
Due to copyright law we could only use clues and words from 1965 and before. These were taken from here: [https://xd.saul.pw/data/](https://xd.saul.pw/data/)
The words were sorted by popularity (which we got from Google's Ngrams) and split into 100 difficulties (The more popular a word, the lower it's difficulty)
To change the word pool of the Crossword game, replace the file /Backend/Games/Crossword/CrosswordCluePool. The new file must have the same format, i.e JSON with the fields 1-100 that each contain an array of words of that difficulty.
Each word should follow this format:
```
{
"answer": <the word>
"clues": [array of possible definitions]
}
```
In case there is a different amount of difficulties we suggest changing /Backend/api.js:set_crossword_difficulty accordingly.

#### CrosswordGenerator
The crossword is generated using [this library.](https://github.com/MichaelWehar/Crossword-Layout-Generator)
Using `generate_layout(d, x)` a layout of a crossword consisting of (up to) x randomly selected answers of difficulty d is returned.
It is important to note that the answers are selected uniformly, and if the answer has multiple potential clues a clue is selected uniformly as well.

### CrosswordModel
The crossword game works as such: A player can input one letter in a cell at a time. Each player can claim one answer at a time - any answer that is claimed by a player cannot be changed by any other player, barring cells intersecting with other answers. When all answers are correctly filled, the game is over.

Whenever a client requests to join a Crossword session, but no such sessions are available, a CrosswordModel is created.
CrosswordModel has a few static properties which can be changed using the [API (see below)](#api-documentation): NUM_OF_CLUES, DIFFICULTY and MAX_PLAYERS. The former two define the properties of the generated crossword.

When a CrosswordModel is created a crossword is generated using the aforementioned properties. CrosswordModel.layout is an object containing the dimensions of the generated crossword and an array of the selected answers and their clues.

CrosswordModel tracks which answers are claimed by which players using two arrays: `claims_by_position` and `claims_by_player`. 
They are defined as such:
claims_by_position[X] = Y <--> claims_by_player[Y] = X <--> The answer with index X is claimed by the player with index Y
The game starts with no players having any claims.

##### Moves:
There are three types of moves: move, claim and release. 
Move description format of a Move is as follows:

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

Move description format of a Claim is as follows:

```
{
    type: "claim",
    body: {
        position: number of clue you wish to claim.
        player: index of player - your index can be found using the game_state.
    }
}
```

Move description format of a Release is as follows:

```
{
    type: "release",
    body: {
        position: number of clue you wish to release.
        player: index of player - your index can be found using the game_state.
    }
}
```

###### CrosswordModel.make_move(move_description):
Given a move description, checks what the type of the move is (Move/Claim/Release) and calls the relevant method.

###### CrosswordModel.apply_move(move_description):
This is called when a player inputs a letter into a cell. CrosswordModel checks if the player has claimed the answer that contains the cell. If the player does, the current board of CrosswordModel is changed and the encapsulating GameSession is notified of the change. If after the player's input the current board layout is equal to the final board layout, that is, all clues have been correctly answered, the game ends and GameSession is notified.

###### CrosswordModel.claim_clue_by_position(move_description):
This is called when a player clicks on an answer. If the answer isn't claimed by anyone else, the player succesfully claims the answer and the encapsulating GameSession is notified of the change. If the player had a claim previously, it is released and is free to be claimed by anyone else.

###### CrosswordModel.release_claim(move_description):
This is called when a player clicks on a black cell in the game, or claims an answer while having a claim previously. If the answer was claimed by the player it is no longer claimed by anyone and is free to be claimed by anyone else.

#### ProjectDatabaseModel
This class is used to connect to MongoDB and upload game reports. Change `uri` and `creds` as needed.


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
**move** is a JSON representing the move made. [See format here.](#moves)

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
[For the Backend UML, Frontend chart and flow example and Events diagram click here](https://drive.google.com/drive/folders/1Ho0x0XXKMLhDKMAr7vXPNeF1AMOPyvM4?usp=sharing)

### Frontend documentation:
[For additional documentation regarding the frontend side of things, click here](https://docs.google.com/document/d/1RSzaMs4PxQPRjfhZR1P4NKHWyCAO8q81/edit?usp=sharing&ouid=100889227141894762892&rtpof=true&sd=true)


Writers
Roey Peleg
Yair Yardeni
