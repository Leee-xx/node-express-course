const express = require('express')
const app = express()
const taskRouter = require('./routes/tasks')

const port = 3000


app.get('/hello', (req, res) => {
  res.send('Task Manager App')
})

// middleware
app.use(express.json())

// routes
app.use('/api/v1/tasks', taskRouter)

app.listen(port, console.log(`Server is listening on port ${port}...`))
