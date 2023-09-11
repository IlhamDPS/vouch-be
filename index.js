const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { checkUsernameExist, getChatRoom } = require('./controllers/roomController');

const server = http.createServer(app);
const socketIo = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET'],
  },
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/vouch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

require('./sockets')(socketIo);

app.post('/api/check-username', checkUsernameExist);
app.post('/api/chat-room', getChatRoom);


server.listen(4000, () => {
  console.log('Server is running on port', 4000);
});