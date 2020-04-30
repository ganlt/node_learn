const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const cache = {};

const chatServer = require('./lib/chat_server');

function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead(
    200,
    { 'Content-Type': mime.getType(path.basename(filePath))}
  );
  response.end(fileContents);
}

function serverStatic(response, cache, absPath) {
  console.log(response)
  // 检查文件是否缓存在内存中
  if (cache[absPath]) {
    // 从内存中返回文件
    sendFile(response, absPath, cache[absPath]);
  } else {
    // 检查文件是否存在
    fs.exists(absPath, (exists) => {
      if (exists) {
        // 从硬盘中读取文件
        fs.readFile(absPath, (err, data) => {
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;
            // 从硬盘中读取文件并返回
            sendFile(response, absPath, data);
          }
        })
      } else {
        send404(response);
      }
    })
  }
}

const server = http.createServer((request, response) => {
  let filePath = false;
  if (request.url === '/') {
    filePath = 'public/index.html';
  } else {
    filePath = 'public' + request.url;
  }
  const absPath = './' + filePath;
  serverStatic(response, cache, absPath);
});

chatServer.listen(server);

server.listen(3000, () => {
  console.log('Server listening on port 3000...');
});
