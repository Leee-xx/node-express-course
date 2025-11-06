const express = require('express')
//const path = require('path')
const app = express()
//const { products } = require('./data')
const logger = require('./logger')
const authorize = require('./authorize')

const port = 3000

app.use([authorize, logger])

app.get('/', (req, res) => {
  res.send('home')
})

app.get('/about', (req, res) => {
  console.log(req.user)
  res.send('about')
})

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`)
})
