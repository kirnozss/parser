const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const sequelize = require('./utils/database')
const config = require('./config/keys')
const articleRoutes = require('./routes/article')

// middleware
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

global.__project = __dirname
app.use('/photo/', express.static(`${__project}/public/photo`))

// routes middleware
app.use('/api/articles', articleRoutes)

// send Error
app.use('/', (err, req, res, next) => {
  if (err) {
      console.log(err)
      res.send(err)
  }
  //  next(err)
})

const port = config.PORT || 4000

async function start() {
  try {
    await sequelize.sync({ alter: true })
    app.listen(port)
  } catch (e) {
    console.log(e)
  }
}

start()