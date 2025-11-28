const express = require('express')
const app = express()
const taskRouter = require('./routes/tasks')
const connectDb = require('./db/connect')

require('dotenv').config()


const port = 3000

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.error(error)
  }
}

app.get('/hello', (req, res) => {
  res.send('Task Manager App')
})

// middleware
app.use(express.json())
app.use(express.static('./public'))

// routes
app.use('/api/v1/tasks', taskRouter)

start()
