module.exports = (io, socket, roomInfo, playerIDMap, updateRoom) => {
  const initializeSushiGoatGame = (room) => {
    

    updateRoom();
  }

  socket.on("iniialize_sushi_goat_game", initializeSushiGoatGame)
}
