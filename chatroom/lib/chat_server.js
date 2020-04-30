const socketio = require('socket.io');
let io;
let guestNumber = 1;
let nickNames = {};
let namesUsed = [];
let currentRoom = {};

// 分配用户昵称
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
  let name = 'Guest' + guestNumber;
  nickNames[socket.id] = name;
  socket.emit('nameResult', {
    success: true,
    name: name
  });
  namesUsed.push(name);
  return guestNumber + 1;
}
// 进入聊天室
function joinRoom(socket, room) {
  // 让用户进入房间
  socket.join(room);
  // 记录用户的当前房间
  currentRoom[socket.id] = room;
  // 让用户知道他们进入了新的房间
  socket.emit('joinResult', {room: room});
  // 让房间里其他用户知道有新用户进入了房间
  socket.broadcast.to(room).emit('message', {
    text: `${nickNames[socket.id]} has joined ${room} .`
  });
  // 确定有哪些用户在这个房间里
  const usersInRoom = io.sockets.clients(room);
  // 若不止一个用户在这个房间里，汇总下都有谁
  if (usersInRoom.length > 1) {
    let usersInRoomSummary = `Users currently in ${room} :`;
    for (let index in usersInRoom) {
      let userSocketId = usersInRoom[index].id;
      if (userSocketId !== socket.id) {
        if (index > 0) {
          usersInRoomSummary += ', ';
        }
        usersInRoomSummary += nickNames[userSocketId];
      }
    }
  }
  usersInRoomSummary += '.';
  // 将房间里其他用户汇总发给这个用户
  socket.emit('message', {
    text: usersInRoomSummary
  });
}

exports.listen = (server) => {
  // 启动Socket.IO服务器，允许他搭建在已有的HTTP服务器上
  io = socketio.listen(server);
  io.serveClient('log level', 1);
  // 定义每个用户连接的处理逻辑
  io.sockets.on('connection', (socket) => {
    // 在用户连接上来时赋予其一个访客名
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
    // 在用户连接上来时把它放到聊天室Yifengge里
    joinRoom(socket, 'Yifengge');
    // 处理用户的消息，更名，以及聊天室的创建和变更
    handleMessageBroadcasting(socket, nickNames);
    handleNameChangeAttempts(socket, nickNames, namesUsed);
    handleRoomJoining(socket);
    // 用户发出请求时，向其提供已经被占用的聊天室的列表
    socket.on('rooms', () => {
      socket.emit('rooms', io.sockets.manager.rooms);
    });
    // 定义用户断开连接后的清除逻辑
    handleClientDisconnection(socket. nickNames, namesUsed);
  })
}