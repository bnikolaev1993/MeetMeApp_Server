var socketio = require('socket.io');
var Message = require('../models/socket.js');

module.exports.listen = function(app) {

  console.log('Web Sockets are connected!');

  var io = socketio.listen(app);
  var userList = [];
  var typingUsers = {};

  io.on('connection', function(clientSocket) {

    var nickname = clientSocket.handshake.query.nickname;
    var paramPlace = clientSocket.handshake.query.place;
    var place = 'room ' + paramPlace.toString();
    clientSocket.join(place);
    io.to(place).emit("userConnectUpdate", nickname);

    console.log('user ' + nickname + ' is connected to the ' + place);
    console.log('Socket ID: ' + clientSocket.id);

    clientSocket.on('disconnect', function() {
      console.log('user disconnected');

      delete typingUsers[nickname];
      io.to(place).emit("userExitUpdate", nickname);
      io.to(place).emit("userTypingUpdate", typingUsers);
      clientSocket.leave(place);
    });

    clientSocket.on("exitUser", function(clientNickname) {
      for (var i = 0; i < userList.length; i++) {
        if (userList[i].id == clientSocket.id) {
          io.to(place).emit("userExitUpdate", userList[i].nickname);
          userList.splice(i, 1);
          break;
        }
      }
    });

    clientSocket.on("getHistoryMessages", function() {
      console.log('History has been loaded!');
      Message.getHistory(paramPlace, function(err, rows) {
        if (err) {
          console.log(err);
          return res.status(404).send({"error": err});
        }
        console.log('History has been loaded!');
        clientSocket.emit("loadHistory", rows);
      });
    });

    clientSocket.on('chatMessage', function(clientNickname, placeID, message) {
      var currentDateTime = new Date().toLocaleString();
      delete typingUsers[clientNickname];
      var msg = {
        place_id: placeID,
        nickname: nickname,
        message: message,
        date: currentDateTime
      };
      Message.addMessage(msg, function (err) {
        if (err) {
          console.log(err);
        }
        io.to(place).emit("userTypingUpdate", typingUsers);
        io.to(place).emit('newChatMessage', clientNickname, message, currentDateTime);
      });
    });


    clientSocket.on("startType", function(clientNickname) {
      console.log("User " + clientNickname + " is writing a message...");
      typingUsers[clientNickname] = 1;
      io.to(place).emit("userTypingUpdate", typingUsers);
    });


    clientSocket.on("stopType", function(clientNickname) {
      console.log("User " + clientNickname + " has stopped writing a message...");
      delete typingUsers[clientNickname];
      io.to(place).emit("userTypingUpdate", typingUsers);
    });

  });
};
