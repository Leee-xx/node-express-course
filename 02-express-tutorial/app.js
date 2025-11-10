const express = require('express')
//const path = require('path')
const app = express()
const peopleRouter = require('./routes/people')
const authRouter = require('./routes/auth')
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

app.use('/login', authRouter)
app.use('/api/people', peopleRouter)

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
