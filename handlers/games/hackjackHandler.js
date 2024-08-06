const hackjackPrograms = require("../constants/hackjackPrograms");

module.exports = (io, socket, roomInfo, playerIDMap, updateRoom) => {
  const initializeHackjackGame = (room, callback) => {
    roomInfo[room].gameInfo.hackjackInfo = {
      players: [roomInfo[room].gameInfo.teams[0].players[0], roomInfo[room].gameInfo.teams[1].players[0]],
      [roomInfo[room].gameInfo.teams[0].players[0]]: {
        name: "",
        stand: false,
      },
      [roomInfo[room].gameInfo.teams[1].players[0]]: {
        name: "",
        stand: false,
      },
      deck: [],
      board: {
        playedPrograms: {
          [roomInfo[room].gameInfo.teams[0].players[0]]: [],
          [roomInfo[room].gameInfo.teams[1].players[0]]: []
        },
        storage: {
          [roomInfo[room].gameInfo.teams[0].players[0]]: [],
          [roomInfo[room].gameInfo.teams[1].players[0]]: []
        },
      },
      programs: {
        deck: hackjackPrograms(),
        [roomInfo[room].gameInfo.teams[0].players[0]]: [],
        [roomInfo[room].gameInfo.teams[1].players[0]]: []
      },
      turn: roomInfo[room].gameInfo.teams[0].players[0]
    }

    updateRoom();

    callback({
      success: true,
      gameInfo: roomInfo[room].gameInfo
    })
  }

  socket.on("iniialize_hackjack_game", initializeHackjackGame)
}
