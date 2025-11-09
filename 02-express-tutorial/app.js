const express = require('express')
//const path = require('path')
const app = express()
const people = require('./routes/people')
//const { people } = require('./data')
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

app.use('./routes/people')

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
