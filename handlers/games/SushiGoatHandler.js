module.exports = (io, socket, roomInfo, playerIDMap, updateRoom) => {
  const initializeSushiGoatGame = (room, callback) => {
    roomInfo[room].gameInfo.words = {
      [roomInfo[room].gameInfo.teams[0].players[0]]: [],
      [roomInfo[room].gameInfo.teams[1].players[0]]: [],
    };
    roomInfo[room].gameInfo.sushi = {
      [roomInfo[room].gameInfo.teams[0].players[0]]: [],
      [roomInfo[room].gameInfo.teams[1].players[0]]: [],
    };
    roomInfo[room].gameInfo.ready = {
      [roomInfo[room].gameInfo.teams[0].players[0]]: false,
      [roomInfo[room].gameInfo.teams[1].players[0]]: false,
    };
    roomInfo[room].gameInfo.score = {
      [roomInfo[room].gameInfo.teams[0].players[0]]: 0,
      [roomInfo[room].gameInfo.teams[1].players[0]]: 0,
    };

    callback({
      success: true,
      gameInfo: roomInfo[room].gameInfo,
    });

    updateRoom(room);
  };

  const submitSushiGoatWord = (room, word, callback) => {
    roomInfo[room].gameInfo.ready[playerIDMap[socket.id].name] = true;
    roomInfo[room].gameInfo.words[playerIDMap[socket.id].name].push(word === "" ? "N/A" : "word");
    roomInfo[room].gameInfo.sushi[playerIDMap[socket.id].name].push(word.length);
    roomInfo[room].gameInfo.score[playerIDMap[socket.id].name] += word.length;

    if (
      roomInfo[room].gameInfo.ready[
        roomInfo[room].gameInfo.teams[0].players[0]
      ] &&
      roomInfo[room].gameInfo.ready[roomInfo[room].gameInfo.teams[1].players[0]]
    ) {
      updateRoom(room);
      socket.to(room).emit("sushi_goat_new_round");
      roomInfo[room].gameInfo.ready[
        roomInfo[room].gameInfo.teams[0].players[0]
      ] = false;
      roomInfo[room].gameInfo.ready[
        roomInfo[room].gameInfo.teams[1].players[0]
      ] = false;
      callback({
        success: true,
        gameInfo: roomInfo[room].gameInfo,
        newRound: true
      });
    } else {
      callback({
        success: true,
        newRound: false
      });
    }
  };

  socket.on("iniialize_sushi_goat_game", initializeSushiGoatGame);
  socket.on("submit_sushi_goat_word", submitSushiGoatWord);
};
