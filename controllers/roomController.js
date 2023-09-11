const Room = require('../models/room');
const Chat = require('../models/chat');

const checkUsernameExist = async (req, res) => {
  const { username, room } = req.body;
  try {
    const roomExists = await Room.findOne({ user: username, room: room });

    if (roomExists) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getChatRoom = async (req, res) => {
  const { room } = req.body;
  try {
    const roomExists = await Chat.find({ room: room });
 
    if (roomExists) {
      res.status(200).json({ data: roomExists });
    } else {
      res.status(200).json({ data: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  checkUsernameExist,
  getChatRoom
};
