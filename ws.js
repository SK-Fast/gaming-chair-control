// change stuff
let sped = 10
let r = 300;

const https = require('https');
const fs = require('fs');
const robot = require('robotjs');

const credentials = {key: fs.readFileSync('key.pem'), cert: fs.readFileSync('cert.pem')};

const server = https.createServer(credentials);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: "*"
});

const Mathutils = require('./utils/math')

robot.setKeyboardDelay(0)
robot.setMouseDelay(0);

let screenSize = robot.getScreenSize();
let height = screenSize.height;
let width = screenSize.width;
let origin = {
	x: width / 2,
	y: height / 2
};
let x, y;

function updatePosition(deg) {
  console.log(deg)

	t = Mathutils.map(deg, 0, 360, 0, 6.3);
	x = Math.floor(origin.x + (r * Math.cos(t)));
    y = Math.floor(origin.y + (r * Math.sin(t)));
	robot.moveMouse(x, y);
}

let d = 1;
let mouseState = 'up'

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('gyro_data', (e) => {
    if (Math.abs(e.z) < 1.5) {
      if (mouseState == 'down') {
        mouseState = 'up'
        robot.mouseToggle('up')
      }
      return
    } else {
      if (mouseState == 'up') {
        mouseState = 'down'
        robot.mouseToggle('down')
      }
    }

    d += e.z * sped;

	  updatePosition(d);

	  if(d > 360) {
  		d = 1;
	  }

    if(d < 0) {
  		d = 360;
	  }
  })
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});