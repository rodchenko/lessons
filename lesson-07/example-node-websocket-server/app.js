const WebSocket = require('ws')

// создаем новый WebSocket сервер
const wss = new WebSocket.Server({port: 8000})

// функция, вызывающаяся при новом подключении
wss.on('connection', function connection (ws) {
  // функция, вызывающаяся при получении сообщения
  ws.on('message', function incoming (data) {
    // выводим полученное сообщение в консоль
    console.log('recieved', data.toString())

    // ретранслируем сообщения остальным клиентам
    wss.clients.forEach(function each (client) {
      // не отправляем, если клиент тот же, что и прислал сообщение
      if (client === ws) return
      // не отправляем, если клиент больше не онлайн
      if (client.readyState !== WebSocket.OPEN) return

      // отправляем сообщение
      client.send(data.toString())
    })
  })
})
