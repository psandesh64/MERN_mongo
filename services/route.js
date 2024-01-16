const { error } = require('console')
const Contact = require('../mongo')
const router = require('express').Router()

router.get('/api/contacts',(request,response) => {
    Contact.find({}).then(result => response.json(result))
})

router.get('/api/contacts/:id',(request,response,next) => {
    Contact.findById(request.params.id)
    .then(result => result ? response.json(result) : 
    response.status(404).json({error : 'contact not found'}))
    .catch(error => next(error))
})

router.post('/api/contacts',(request,response,next) => {
    const body = request.body
    if (body.contact_id === undefined) {
        return response.status(400).json({error: 'content missing'})
    }

    const contact = new Contact({
        contact_id: body.contact_id,
        number: body.number
    })

    contact.save().then(result => {
        response.json(result)
    })
    .catch(error => next(error))
    response.end()
})

router.delete('/api/contacts/:id',(request,response) => {
    Contact.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => response.status(500).json({error: 'Internal Server Error'}))   
})
module.exports =  router
