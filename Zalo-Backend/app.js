import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import expressValidator from 'express-validator'
import helmet from 'helmet'
import connectNoSql from './src/configs/nosql/config'
import connectMySql from './src/configs/sql/connectMySql'
import handleException from './src/middlewares/handleException.middleware'
import configRoutes from './src/routes/index'
require('dotenv').config()

const app = express()

app.use(function (req, res, next) {
  const allowedOrigins = ['http://localhost:8096']
  const origin = req.headers.origin

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
  )

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(helmet())
app.use(expressValidator())

app.use(cookieParser())

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

connectMySql()
connectNoSql()

configRoutes(app)

app.use(handleException.notFoundHandler)
app.use(handleException.errorHandler)

module.exports = app
