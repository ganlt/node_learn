const fs = require('fs')

const addMapping = (router, mapping) => {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4)
      router.get(path, mapping[url])
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
        // 如果url类似"POST xxx":
        var path = url.substring(5);
        router.post(path, mapping[url]);
        console.log(`register URL mapping: POST ${path}`);
    } else {
        // 无效的URL:
        console.log(`invalid URL: ${url}`);
    }
  }
}
const addControllers = (router) => {
  const files = fs.readdirSync(__dirname + '/controllers')
  const js_files = files.filter((f) => f.endsWith('.js'))
  for (let f of js_files) {
    console.log(`process controller: ${f}...`);
    const mapping = require(__dirname + '/controllers/' + f)
    addMapping(router, mapping)
  }
}

const controller = (dir) => {
  const controller_dir = dir || 'controllers'
  const router = require('koa-router')()
  addControllers(router, controller_dir)
  return router.routes()
}

module.exports = controller