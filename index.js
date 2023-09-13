let server = require('ws').Server
let port = 5001
let s = new server({ port: port })

console.log('Hello Tasc-websocket. The port number is ' + port)

s.on('connection', function (ws) {
  ws.on('message', function (message) {
    let messageObject
    try {
      messageObject = JSON.parse(message)
    } catch (error) {
      console.error('This is not JSON. ' + e)
      return
    }
    if (!messageObject.type) {
      console.error(
        'object.type is Undefined! ' + JSON.stringify(messageObject)
      )
      return
    }
    messageObject.date = new Date()
    let returns = JSON.stringify(messageObject)
    console.log('Received: ' + returns)

    s.clients.forEach(function (client) {
      client.send(returns)
    })
  })

  ws.on('close', function (e) {
    console.log('I lost a client. Statuscode = ' + e)
  })
})
