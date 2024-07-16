const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 4026 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // Broadcast the message to all connected clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
        console.log(message);
      }
    });
    
  });
});

console.log('WebSocket server is running on ws://localhost:4026');
