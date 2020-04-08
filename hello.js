'use strict';
var s = 'hello';
function greet(name) {
  console.log(s + ' ' + name);
}

function sayHi(name) {
  console.log('hi' + ' ' + name);
}

module.exports = {
  greet,
  sayHi
};