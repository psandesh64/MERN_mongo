const Contact = require('../mongo')
const router = require('express').Router()

router.get('/api/contacts',(request,response) => {
    Contact.find({}).then(result => response.json(result))
})

router.get('/api/contacts/:id',(request,response) => {
    Contact.findById(request.params.id)
    .then(result => result ? response.json(result) : 
    response.status(404).json({error : 'contact not found'}))
    .catch(error => response.status(500).json({error: 'Internal Server Error'}))
})

router.post('/api/contacts',(request,response) => {
    const body = request.body

    if (body.contact_id == undefined) {
        return response.status(400).json({error: 'content missing'})
    }

    const contact = new Contact({
        contact_id: body.contact_id,
        number: body.number
    })

    contact.save().then(result => {
        response.json(result)
    })
})

module.exports =  router
