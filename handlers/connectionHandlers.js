module.exports = (io, socket, roomInfo, playerIDMap, updateRoom) => {
  const handleJoinRoom = (data, callback) => {
    //check for duplicate names
    if (roomInfo[data.room] && roomInfo[data.room].players.includes(data.name)) {
      callback({
        success: false,
        message: "Name is already taken.",
      });
      //check for name length
    } else if (data.name.length > 20) {
      callback({
        success: false,
        message: "Name must be 20 characters or less in length.",
      });
    } else if (data.name === "" || data.room === "") {
      callback({
        success: false,
        message: "The name and room fields cannot be empty.",
      });
    } else {
      //map id to name and add name to room list
      playerIDMap[socket.id] = {
        name: data.name,
        room: data.room,
      };

      if (roomInfo[data.room]) {
        roomInfo[data.room].players.push(data.name);
      } else {
        roomInfo[data.room] = {
          players: [data.name],
          ready: [],
          gameInfo: {},
        }
      }

      //join the room and broadcast lobby size change to all
      socket.join(data.room);
      console.log(data.name + " has joined room " + data.room);
      callback({
        success: true,
        players: roomInfo[data.room].players,
        ready: roomInfo[data.room].ready,
        gameInfo: roomInfo[data.room].gameInfo,
      });
      updateRoom(data.room);
    }
  };

  const handleDisconnecting = () => {
    //remove player from room list and update all clients with change
    let room = [...socket.rooms][1];
    if (roomInfo[room] && roomInfo[room].players.includes(playerIDMap[socket.id].name)) {
      console.log("User" + socket.id + " has left room " + room);
      roomInfo[room].players.splice(
        roomInfo[room].players.indexOf(playerIDMap[socket.id].name),
        1
      );
      if (roomInfo[room].players.length === 0) {
        roomInfo[room].players = undefined;
        roomInfo[room].gameInfo = undefined;
        roomInfo[room] = undefined;
        console.log("Destroying room " + room, roomInfo[room]);
      } else {
        updateRoom(room);
      }
    }
  };

  socket.on("join_room", handleJoinRoom);
  socket.on("disconnecting", handleDisconnecting);
  socket.on("leave_room", handleDisconnecting);
};
