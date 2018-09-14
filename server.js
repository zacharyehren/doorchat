const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');

let connection = {
    port: process.env.PORT || 3000,
    host: process.env.IP || 'localhost'
};

let routes = [
    {
        method: 'GET',
        path: '/scripts/{path*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '/app/scripts')
              }
        }
    },
    {
        method: 'GET',
        path: '/styles/{path*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '/app/styles')
              }
        }
    },
    {
        method: 'GET',
        path: '/assets/{path*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '/app/assets')
              }
        }
    },
    {
        method: 'GET',
        path: '/templates/{path*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '/app/templates')
              }
        }
    },
    {
        method: 'GET',
        path: '/{path*}',
        handler: {
            file: Path.join(__dirname, '/app/index.html')
        }
    }
]

let server = new Hapi.Server();
server.connection(connection);

server.register([Inert], (err) => {
    if (err) {
        throw err;
    }

    server.route(routes);
});

server.start(() => {
    console.log('Server started at: ' + server.info.uri);
});

server.on('response', function (request) {
    if(request.url.path.includes('templates')) {
        console.log();
        console.log(new Date().toString() + ':  ' + request.method.toUpperCase() + ' - ' + request.url.path + ' - (' + request.response.statusCode + ')');
    }
});

module.exports = server;

var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var shortid = require('shortid')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var port = process.env.PORT || 8080

var router = express.Router()

// Unsafely enable cors
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// logging middleware
router.use(function(req, res, next) {
    console.log('\nReceived:',{url: req.originalUrl, body: req.body, query: req.query})
    next()
})

// Simple in memory database
const database = [
  { name: 'Tea Chats', id: 0, users: ['Ryan','Nick', 'Danielle'], messages: [{name: 'Ryan', message: 'ayyyyy', id: 'gg35545', reaction: null},{name: 'Nick', message: 'lmao', id: 'yy35578', reaction: null}, {name: 'Danielle', message: 'leggooooo', id: 'hh9843', reaction: null}]},
  { name: 'Coffee Chats', id: 1, users: ['Jessye'], messages: [{name: 'Jessye', message: 'ayy', id: 'ff35278', reaction: null}]}
]


// Utility functions
const findRoom = (roomId) => {
  const room = database.find((room) => {
    return room.id === parseInt(roomId)
  })
  if (room === undefined){
    return {error: `a room with id ${roomId} does not exist`}
  }
  return room
}

const findRoomIndex = (roomId) => {
  const roomIndex = database.findIndex((room) => {
    return room.id === parseInt(roomId)
  })
  return roomIndex
}

const findMessageIndex = (room, messageId) => {
  const messageIndex = room.messages.findIndex((message) => {
    return message.id === messageId
  })
  return messageIndex
}

const logUser = (room, username) => {
  const userNotLogged = !room.users.find((user) => {
    return user === username
  })

  if (userNotLogged) {
    room.users.push(username)
  }
}

// API Routes
router.get('/rooms', function(req, res) {
    const rooms = database.map((room) => {
      return {name: room.name, id: room.id}
    })
    console.log('Response:',rooms)
    res.json(rooms)
})

router.get('/rooms/:roomId', function(req, res) {
  room = findRoom(req.params.roomId)
  if (room.error) {
    console.log('Response:',room)
    res.json(room)
  } else {
    console.log('Response:',{name: room.name, id: room.id, users: room.users})
    res.json({name: room.name, id: room.id, users: room.users})
  }
})

router.route('/rooms/:roomId/messages')
  .get(function(req, res) {
    room = findRoom(req.params.roomId)
    if (room.error) {
      console.log('Response:',room)
      res.json(room)
    } else {
      console.log('Response:',room.messages)
      res.json(room.messages)
    }
  })
  .post(function(req, res) {
    room = findRoom(req.params.roomId)
    if (room.error) {
      console.log('Response:',room)
      res.json(room)
    } else if (!req.body.name || !req.body.message) {
      console.log('Response:',{error: 'request missing name or message'})
      res.json({error: 'request missing name or message'})
    } else {
      logUser(room, req.body.name)
      const reaction = req.body.reaction || null
      const messageObj = { name: req.body.name, message: req.body.message, id: shortid.generate(), reaction }
      room.messages.push(messageObj)
      console.log('Response:',{message: 'OK!'})
      res.json(messageObj)
    }
  })

app.use('/api', router)
app.listen(port)
console.log(`API running at localhost:${port}/api`)
