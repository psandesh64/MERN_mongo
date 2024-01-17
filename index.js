const express = require('express')
const app = express()
const {MONGODB_URL,PORT} = require('./utils/config')
const logger = require('./utils/logger')


const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
mongoose.connect(MONGODB_URL)
.then(result => console.log('connected to MongoDB'))
.catch(error => console.log('error connecting to MongoDB:',error.message))

app.use(express.json())

const requestLogger = (req,res,next) => {
    logger.info('Method :',req.method)
    logger.info('Path :',req.path)
    logger.info('Body :',req.body)
    console.log('--------------------')
    next()
}
app.use(requestLogger)

const route =require('./services/route')
app.use('/',route)

const errorHandler = (error, request, response, next) => {
    logger.error(error.name)
    logger.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }
    else if (error.name === 'ValidationError'){
        return response.status(400).send({error: 'Invalidate contact'})
    }
    next()
}
app.use(errorHandler)

const unknownEndpoint = (req,res)=>{
    res.status(404).send({message:':/'})
}
app.use(unknownEndpoint)

app.listen(PORT, ()=>{
    logger.info(`Server running on port http://localhost:${PORT}`)
})