const express = require('express')
//const path = require('path')
const app = express()
const { products } = require('./data')

const port = 3000

app.get('/', (req, res) => {
  res.json(products)
})

app.get('/api/v1/query', (req, res) => {
  const { search, limit } = req.query
  let sortedProducts = [...products]

  if (search) {
    sortedProducts = sortedProducts.filter((p) => {
      return p.name.startsWith(search)
    })
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }

  if (sortedProducts.length < 1) {
    return res.status(200).send(({ success: true, data: [] }))

  } else {

  }
    res.status(200).send(sortedProducts)
})

/*
// setup static file's directory and middleware
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
