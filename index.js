console.log('Hello Tasc-websocket')
var server = require('ws').Server
var s = new server({ port: 5001 })

s.on('connection', function (ws) {
  ws.on('message', function (message) {
    try {
      JSON.parse(message)
    } catch (error) {
      console.error('This is not JSON. ' + e)
      return
    }
    message.date = new Date()
    console.log('Received: ' + message)

    s.clients.forEach(function (client) {
      client.send(message)
    })
  })

  ws.on('close', function (e) {
    console.log('I lost a client. Statuscode = ' + e)
  })
})
