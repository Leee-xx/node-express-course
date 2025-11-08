const express = require('express')
//const path = require('path')
const app = express()
const { people } = require('./data')
//const logger = require('./logger')
//const authorize = require('./authorize')

const port = 3000

app.use(express.static('./methods-public'))

/*
app.get('/', (req, res) => {
  res.send('home')
})

*/

app.use(express.urlencoded({ extended: false}) )

// parse incoming JSON and attach it to req.body
app.use(express.json())

app.get('/api/people', ( req, res) => {
  res.status(200).json({ success: true, data: people })
})

app.post('/api/people', (req, res) => {
  const { name } = req.body
  if (!name) {

    return res.status(400).json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, person: name })
})

app.post('/login', (req, res) => {
  console.log(req.body)
  const { name } = req.body
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }
  res.status(401).send('not auth')
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
