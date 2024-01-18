const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    contact_id: {
        type: String,
        minLength: 3},
    number: {
        type: String,
        minLength:8,
        validate: {
            validator: function(x) {
                return /^\d{3}-\d{4}$/.test(x)
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: true
    }
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