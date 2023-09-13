let server = require('ws').Server
const { exec } = require('child_process')

/**
 * 該当のOSがTrueになる
 */
const os = {
  windows: process.platform === 'win32',
  mac: process.platform === 'darwin',
  linux: process.platform === 'linux'
}
/**
 * 使いたいポート番号を選択
 */
let port = 5001
let s = new server({ port: port })

console.log('Hello Tasc-websocket. The port number is ' + port)
if (os.linux) {
  exec('hostname -I', (error, stdout, stderror) => {
    if (error) {
      console.error('exec error: ' + error)
      return
    }
    console.log('stdout: ' + stdout)
    console.error('stderr: ' + stderror)
  })
} else {
  console.log('You not use Linux. Unknown IP address')
}

s.on('connection', function (ws) {
  ws.on('message', function (message) {
    /**
     * 受け取ったメッセージは基本JSONなので、
     * Object形式に変換して扱う
     */
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
    /**
     * Objectのままでは送信できないので、
     * JSON形式に変換
     */
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
