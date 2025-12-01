require('dotenv').config()

// async errors

const express = require('express')
const app = express()

const connectDb = require('./db/connect')
const productRouter = require('./routes/products')

const port = process.env.PORT || 3000

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productRouter)

// products routes
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    console.log(`\nListening on port ${port}...\n`)
    app.listen(port)
  } catch (error) {
    console.error(`Something went wrong: ${error}`)

  }
}

start()
