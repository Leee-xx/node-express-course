const express = require('express')
//const path = require('path')
const app = express()
const { products } = require('./data')

const port = 3000

app.get('/', (req, res) => {
  res.json(products)
})

/*
// setup static and middleware
app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
})
*/

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`)
})
