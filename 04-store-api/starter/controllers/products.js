const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query
  const queryObject = {}

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if (company) {
    queryObject.company = company
  }
  if (name) {
    queryObject.name = {
      $regex: name,
      $options: 'i',
    }
  }

  const products = await Product.find(queryObject)
  res.status(200).json({ products, count: products.length })
}

const getAllProductsStatic = async (req, res) => {
  const search = 'ab'
  const products = await Product.find({
    name: {
      $regex: search,
      $options: 'i'
    }
  })
  res.status(200).json({ products, count: products.length })
  //res.status(200).json({msg: 'products testing static' })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}
