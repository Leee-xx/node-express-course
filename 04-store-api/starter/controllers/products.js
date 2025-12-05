const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  const products = await Product.find({})
  res.status(200).json({ products })
}

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ })
  res.status(200).json({ products, count: products.length })
  //res.status(200).json({msg: 'products testing static' })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}
