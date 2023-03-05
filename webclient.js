const https = require('https');
const express = require('express')
const path = require('path')
const app = express()
const ip = require('ip');
const fs = require('fs');
const port = 3002

const credentials = {key: fs.readFileSync('key.pem'), cert: fs.readFileSync('cert.pem')};

const httpsServer = https.createServer(credentials, app);

app.use(express.static('web'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'web/index.html'))
})

httpsServer.listen(port, () => {
  console.log(`Web client started at port ${ip.address()}:${port}`)
})