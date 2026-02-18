const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join('. ')
    customError.statusCode = 400
  } else if (err.name === 'CastError') {
    customError.msg = `No item found for ID: ${err.value}`
    customError.statusCode = 404
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field(s), please use another value`
    customError.statusCode = 400
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
  //return res.status(customError.statusCode).json({ err })
}

module.exports = errorHandlerMiddleware
