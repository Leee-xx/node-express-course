const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new CustomAPIError('Please provide username and password', 400)
  }

  // mongo

  console.log(username, password)
  res.send('login placeholder')
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: `Hello John Doe`,
    secret: `placeholder authorized data, lucky number is ${luckyNumber}`
  })
}

module.exports = { login, dashboard }
