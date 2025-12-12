const login = async (req, res) => {
  res.send('placeholder')
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: `Hello John Doe`,
    secret: `placeholder authorized data, lucky number is ${luckyNumber}`
  })
}

module.exports = { login, dashboard }
