### Koa

#### Koa 和 express 比较
1. express对 NodeJs 的 http 进行封装，基于 ES5 的语法，要想实现异步代码方法只有回调，若异步嵌套太多，代码繁琐
2. Koa 1.0 基于 ES6 的语法，通过 generator 实现异步
3. Koa 2.0 基于 ES7 的语法，使用 Promise 配合 async 实现异步