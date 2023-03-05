const webview = require("@suchipi/webview");
const QRCode = require('qrcode')
const ip = require('ip');
const path = require('path');

require('./webclient.js')
require('./ws.js')

QRCode.toFile('./qrscan/qr.png', `https://${ip.address()}:3002`, function (err, url) {
    const child = webview.spawn({
        title: "scan pls",
        width: 500,
        height: 500,
        dir: path.resolve(__dirname, "./qrscan"),
       
        cwd: process.cwd(),
    });
    child.addListener('exit', () => {
        process.exit()
    })
})