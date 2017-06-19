const WebSocket = require('ws')
// создаем новый WebSocket сервер
const wss = new WebSocket.Server({port: 8000})

var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://students.conformity.io', {
  clientId: 'websocket server',
  username: 'student',
  password: 'rodchenko students only'
})

client.on('connect', function () {
  client.subscribe('/light')
})

client.on('message', function (topic, message) {
  console.log(message.toString())
  wss.clients.forEach(function each (client) {
    if (client.readyState !== WebSocket.OPEN) return
    client.send(message.toString())
  })
})
