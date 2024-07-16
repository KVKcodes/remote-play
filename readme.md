# Remote-play

Control your peer's device with simple websocket communication.

## Prerequisites/Modules used
1. NodeJS - runtime env
2. Express - middleware
3. Cors - Allows you to connect with other origins
4. WS - Websocket library
5. RobotJS - Used for controlling your computer using a robot

## Steps to use
1. Run server.js using the command `node server.js`
2. Use a port forwarding service to forward the port that is running your server.js (Ngrok did not work for me, I used the one that VSCode provides)
3. Paste the link that the port forwarding service provides you as the "WS_URL" (make sure you replace the "http" with "ws". If it is "https", replace it with "wss")
4. Run the index.html on a live server.
5. Forward the port of your live server that is serving index.html using a port forwarding service
6. Make both the server.js and the index.js port forwarding links public -> So anyone can use it
7. Send the link of your index.js port to your friend who wants to control your PC.
8. Now, the index.js is listening to your friend's keystrokes and actions and responds it to the server

## Look out for...
 - Make sure you replace the "http" with "ws". If it is "https", replace it with "wss" for your port forwarding link of your server.js when you are defining "WS_URL" in index.html
 - Make both the server.js and the index.js port forwarding links public -> So anyone can use it
 - Ngrok did not work for me, I used the one that VSCode provides
