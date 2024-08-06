module.exports = (io, socket, roomInfo, playerIDMap, updateRoom) => {
  const initializeLetrisGame = (room, callback) => {
    for (let i = 0; i < roomInfo[room].players.length; i++) {
      roomInfo[room].gameInfo.letrisInfo.push({
        name: roomInfo[room].players[i],
        board: [
          ["", "", "", "", "", "", ""],
          ["", "", "", "", "", "", ""],
          ["", "", "", "", "", "", ""],
          ["", "", "", "", "", "", ""],
          ["", "", "", "", "", "", ""],
          ["", "", "", "", "", "", ""],
          ["", "", "", "", "", "", ""],
          ["", "", "", "", "", "", ""],
          ["", "", "", "", "", "", ""],
          ["", "", "", "", "", "", ""],
          ["", "", "", "", "", "", ""],
          ["", "", "", "", "", "", ""],
          ["", "", "", "", "", "", ""],
          ["", "", "", "", "", "", ""],
          ["", "", "", "", "", "", ""],
        ]
      })

    updateRoom();

    callback({
      success: true,
      gameInfo: roomInfo[room].gameInfo
    })
  }
}

  const updateLetrisGame = (room, board) => {
    for (let i = 0; i < roomInfo[room].players.length; i++) {
      if (roomInfo[room].gameInfo.letrisInfo[i].name === playerIDMap[socket.id]) {
        roomInfo[room].gameInfo.letrisInfo[i].board == board;
        break;
      }
    }

    updateRoom();
  }

  socket.on("iniialize_letris_game", initializeLetrisGame)
  socket.on("update_letris_game", updateLetrisGame)
}
