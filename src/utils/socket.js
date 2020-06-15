import { BASE_URL } from 'config';
import io from 'socket.io-client';

export default function () {
  const socket = io.connect(BASE_URL);

  function registerHandler(onMessageReceived) {
    socket.on('message', onMessageReceived);
  }

  function unregisterHandler() {
    socket.off('message');
  }

  socket.on('error', function (err) {
    console.log('received socket error:');
    console.log(err);
  });

  function register(name, cb) {
    socket.emit('register', name, cb);
  }

  function join(chatroomName, cb) {
    socket.emit('join', chatroomName, cb);
  }

  function leave(chatroomName, cb) {
    socket.emit('leave', chatroomName, cb);
  }

  function message(chatroomName, message, cb) {
    socket.emit('message', { chatroomName, message: message }, cb);
  }

  function getChatrooms(cb) {
    socket.emit('chatrooms', null, cb);
  }

  function getAvailableUsers(cb) {
    socket.emit('availableUsers', null, cb);
  }

  return {
    register,
    join,
    leave,
    message,
    getChatrooms,
    getAvailableUsers,
    registerHandler,
    unregisterHandler,
  };
}
