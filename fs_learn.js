'use strict';
// var { greet, sayHi} = require('./hello')
// var name = 'Tom'
// greet(name)
// sayHi(name)

// fs

const fs = require('fs');
// 异步读取文本文件
fs.readFile('./assets/example.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
// 读取二进制文件
fs.readFile('./assets/xxx.jpg', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data) // 此时data为一个Buffer对象
    console.log(data.length + ' bytes')
  }
})
// 同步读取文件
const data = fs.readFileSync('assets/example.txt', 'utf-8')
console.log('同步：' + data)

// stream

const stream = fs.createReadStream('assets/example.txt', 'utf-8')
stream.on('data', (chunk) => {
  console.log('data::')
  console.log(chunk)
})
stream.on('end', () => {
  console.log('end..')
})
stream.on('error', (err) => {
  console.log('err::')
  console.log(err)
})