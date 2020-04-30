process.on('exit', ()=> {
  console.log('exit...')
})
process.nextTick(() => {
  console.log('jjjj')
})

console.log('hhhh')

if (typeof(window) === 'undefined') {
  console.log('node..')
} else {
  console.log('browser')
}