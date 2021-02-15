// connect mongoDB
import mongoose, { connect } from 'mongoose'
import dotenv from 'dotenv'
// const dotenv = require('dotenv')
dotenv.config()
const mongoURI = process.env.MONGO_DB_URI

export default () => {
  // .env setup

  
  mongoose.Promise = global.Promise
  mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.connection
    .once('open', () => console.log('Mongodb running'))
    .on('error', err => console.error(err))
}


