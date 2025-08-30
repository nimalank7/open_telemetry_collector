const express = require('express')
const app = express()
const port = 3000
const logger = require('./logger');

app.get('/', (req, res) => {
  logger.info('/ endpoint requested')
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
