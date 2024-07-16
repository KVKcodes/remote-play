const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const cors = require('cors');
const robot = require('robotjs');

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function executeKeyStroke(keyEvent) {
  const { type, key } = JSON.parse(keyEvent);

  // Map special keys
  const keyMap = {
    'ArrowUp': 'up',
    'ArrowDown': 'down',
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'Enter': 'enter',
    'Backspace': 'backspace',
    'Tab': 'tab',
    'Escape': 'escape',
    'Delete': 'delete',
    // Add more mappings as needed
  };

  const robotKey = keyMap[key] || key.toLowerCase();

  if (!robotKey) {
    console.error(`Unmapped key: ${key}`);
    return;
  }

  console.log(`Executing keystroke: ${type} ${robotKey}`);

  if (type === 'keydown') {
    robot.keyToggle(robotKey, 'down');
  } else if (type === 'keyup') {
    robot.keyToggle(robotKey, 'up');
  } else {
    console.error(`Unknown key event type: ${type}`);
  }
}

wss.on('connection', function connection(ws) {
  console.log('New client connected');
  
  ws.on('message', function incoming(message) {
    console.log('Received:', message.toString());
    // Execute the keystroke on the server machine
    executeKeyStroke(message.toString());
    // Broadcast the message to all connected clients except the sender
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 4026;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});
