'use strict';

const http = require('http')
const url = require('url')

const server = http.createServer((request, response) => {
  console.log(request.method)
  console.log(request.url)

  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end('<p>Hello</p>')
})
server.listen(8888)
console.log('server listening http://127.0.0.1:8888')