var express = require('express')
// more info: https://github.com/marak/say.js
var say = require('say')
// more info: https://github.com/mikaelbr/node-notifier
var notifier = require('node-notifier')

// create express app and start it
var app = express()
app.listen(8000)

app.get('/', function (request, response) {
  // log users headers
  console.log('rawHeaders', request.headers)

  // sent text hello to user
  response.send('hello')

  // speak 'New user connected' on the machine
  say.speak('New user connected')

  // show notification with ip-address of the user
  notifier.notify({
    title: 'New user connected',
    message: String(request.headers['x-forwarded-for'])
  })
})
