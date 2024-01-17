const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    contact_id: {
        type: String,
        minLength: 3},
    number: Number
})

contactSchema.set('toJSON', {
    transform : (doc,ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})
const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact