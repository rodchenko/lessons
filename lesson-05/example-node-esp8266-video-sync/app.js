var vlc = require('vlc-simple-player')
var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://students.conformity.io', {
  clientId: 'your_unique_client_id',
  username: 'your_username_for_mqtt_server',
  password: 'your_password_for_mqtt_server'
})

vlc.play('video/TheRingingScene.mp4')

vlc.on('statuschange', (status) => {
  console.log('current time', status.time)
  if (status.time > 9 && status.time < 20) {
    client.publish('/rodchenko/movie/bzz', '1')
  } else {
    client.publish('/rodchenko/movie/bzz', '0')
  }
})

client.on('connect', function () {
  client.subscribe('/rodchenko/movie/status')
})

client.on('message', function (topic, message) {
  console.log('message', topic, message.toString())
})
