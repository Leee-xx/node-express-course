
const getAllProducts = async (req, res) => {
  res.status(200).json({msg: 'products testing' })
}

const getAllProductsStatic = async (req, res) => {
  res.status(200).json({msg: 'products testing static' })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}
