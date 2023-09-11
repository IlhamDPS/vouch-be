const Chat = require('./models/chat');
const Room = require('./models/room');

module.exports = (socketIo) => {
  socketIo.on('connection', (socket) => {

    socket.removeAllListeners();
    socket.on('join_room', async (data) => {
      try {
        const newRoom = new Room({
          user: data.username,
          room: data.room,
        });

        await newRoom.save();
        console.log(data, "data join")
        socket.join(data.room);
      } catch (e) {
        console.error(e);
      }
    });

    socket.on('send_message', async (data) => {
      try {
        const newMessage = new Chat({
          user: data.author,
          message: data.message,
          time: data.time,
          room: data.room,
        });

        await newMessage.save();
        console.log(data, "data send")
        socket.to(data.room).emit('receive_message', data);
      } catch (e) {
        console.error(e);
      }
    });

    socket.on('disconnect', () => {
    });
  });
};