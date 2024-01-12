require('dotenv').config()
const express = require('express')
const app = express()
const Contact = require('./mongo')
const route =require('./services/route')
const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.set('strictQuery',false)
mongoose.connect(url)
.then(result => console.log('connected to MongoDB'))
.catch(error => console.log('error connecting to MongoDB:',error.message))

app.use(express.json())

app.use(route)
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})