const Product = require('../models/product')

function reformatQueryStr(str) {
  return str.split(',').join(' ')
}

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query
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

  let result = Product.find(queryObject)

  if (sort) {
    const sortList = reformatQueryStr(sort)
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)

  if (fields) {
    const fieldsList = reformatQueryStr(fields)
    result = result.select(fieldsList)
  }

  const products = await result

  res.status(200).json({ products, count: products.length })
}

const getAllProductsStatic = async (req, res) => {
  const search = 'ab'
  const products = await Product.find({
    /*
    name: {
      $regex: search,
      $options: 'i'
    }
    */
  })
  res.status(200).json({ products, count: products.length })
  //res.status(200).json({msg: 'products testing static' })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}
