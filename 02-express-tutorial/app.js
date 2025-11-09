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

app.post('/api/postman/people', (req, res) => {
  const { name } = req.body
  if (!name) {

    return res.status(400).json({ success: false, msg: 'please provide name value' })
  }

  const lastId = people[people.length - 1].id
  people.push({ id: lastId + 1, name })
  console.log(people)
  res.status(201).json({ success: true, data: [...people, name] })
})

app.post('/api/people', (req, res) => {
  const { name } = req.body
  if (!name) {

    return res.status(400).json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, person: name })
})

app.put('/api/people/:id', (req, res) => {
  const id = Number(req.params.id)
  const { name } = req.body

  console.log(id)
  console.log(people)
  const person = people.find((p) => p.id === id )

  if (!person) {

    return res.status(404).json({ success: false, msg: `no person with id ${id}`})
  }
  console.log(person)

  const newPeople = people.map((p) => {
    if (p.id === person.id) {
      p.name = name
    }

    return p
  })
  res.status(200).json(newPeople)
})

app.delete('/api/people/:id', (req, res) => {
  const id = Number(req.params.id)

  const person = people.find((p) => p.id === id )

  if (!person) {

    return res.status(404).json({ success: false, msg: `no person with id ${id}`})
  }


  const newPeople = people.filter(p => p.id !== id)

  res.status(200).json({ success: true, data: newPeople })
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
