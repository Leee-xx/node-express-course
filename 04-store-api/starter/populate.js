require('dotenv').config()

const connectDb = require('./db/connect')
const Product = require('./models/product')

const productsJson = require('./products.json')

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    console.log('successfuly connected to db')
    await Product.deleteMany()
    await Product.create(productsJson)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
process.exit(0)
