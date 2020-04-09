'use strict';

const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

// 从命令行参数获取root目录，默认为当前目录
const root = path.resolve(process.argv[2] || '.')
console.log('Static root dir::' + root)

// 创建服务器
const server = http.createServer((req, res) => {
  // 获得url的path
  const pathName = url.parse(req.url).pathname
  // 获得对应的本地文件路径
  const filePath = path.join(root, pathName)
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      console.log('200::' + req.url)
      res.writeHead(200)
      fs.createReadStream(filePath).pipe(res)
    } else {
      console.log('404::' + err)
      res.writeHead(404)
      res.end('404 Not Found')
    }
  })
})

server.listen(8888)

console.log('server listening http://127.0.0.1:8888')


// node file_server.js index.html