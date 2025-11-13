let { people } = require('../data')

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people })
}

const createPerson = (req, res) =>  {
  const { name } = req.body
  if (!name) {

    return res.status(400).json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, person: name })
}

const createPersonPostman = (req, res) => {
  const { name } = req.body
  if (!name) {

    return res.status(400).json({ success: false, msg: 'please provide name value' })
  }

  const lastId = people[people.length - 1].id
  people.push({ id: lastId + 1, name })
  console.log(people)
  res.status(201).json({ success: true, data: [...people, name] })
}

const updatePerson = (req, res) => {
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
}

const deletePerson = (req, res) => {
  const id = Number(req.params.id)

  const person = people.find((p) => p.id === id )

  if (!person) {

    return res.status(404).json({ success: false, msg: `no person with id ${id}`})
  }


  const newPeople = people.filter(p => p.id !== id)

  res.status(200).json({ success: true, data: newPeople })
}

module.exports = {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson
}
