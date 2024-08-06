const gameStateConstants = require("./constants/gameInfoStates");
const gameInfoStates = gameStateConstants();

module.exports = (io, socket, roomInfo, playerIDMap, updateRoom) => {
  const selectGame = (room, gameID, callback) => {
    roomInfo[room].gameInfo = JSON.parse(JSON.stringify(gameInfoStates[gameID]));
    roomInfo[room].ready = [];
    updateRoom(room);
    callback({
      success: true,
      ready: [],
      gameInfo: roomInfo[room].gameInfo,
    });
  };

  const joinTeam = (room, index, callback) => {
    //reject if already in team or no more space in team
    if (
      roomInfo[room].gameInfo.teams[index].players.includes(
        playerIDMap[socket.id].name
      )
    ) {
      //do nothing
    } else if (
      roomInfo[room].gameInfo.teams[index].length >=
      roomInfo[room].gameInfo.teams[index].max
    ) {
      callback({
        success: false,
        message: "maxTeamSizeReached",
      });
    } else {
      for (let i = 0; i < roomInfo[room].gameInfo.teams.length; i++) {
        if (
          roomInfo[room].gameInfo.teams[i].players.includes(
            playerIDMap[socket.id].name
          )
        ) {
          roomInfo[room].gameInfo.teams[i].players.splice(
            roomInfo[room].gameInfo.teams[i].players.indexOf(
              playerIDMap[socket.id].name
            ),
            1
          );
        }
      }
      roomInfo[room].gameInfo.teams[index].players.push(
        playerIDMap[socket.id].name
      );
      updateRoom(room);
      callback({
        success: true,
        gameInfo: roomInfo[room].gameInfo,
      });
    }
  };

  const setReady = (room, callback) => {
    if (roomInfo[room].ready.includes(playerIDMap[socket.id].name)) {
      roomInfo[room].ready.splice(
        roomInfo[room].ready.indexOf(playerIDMap[socket.id].name),
        1
      );
    } else {
      roomInfo[room].ready.push(playerIDMap[socket.id].name);
    }
    updateRoom(room);
    callback({
      success: true,
      ready: roomInfo[room].ready,
    });
  };

  const startGame = (room, callback) => {
    socket.to(room).emit("starting_game");
    callback({
      success: true,
    })
  };

  socket.on("select_game", selectGame);
  socket.on("join_team", joinTeam);
  socket.on("set_ready", setReady);
  socket.on("start_game", startGame);
};
