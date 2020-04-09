// crypto 用来提供通用的加密和哈希算法

const crypto = require('crypto')
const hash = crypto.createHash('md5')

hash.update('hi')
hash.update('hi')

console.log(hash.digest('hi'))