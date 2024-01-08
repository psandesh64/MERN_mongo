const mongoose = require('mongoose')

if (process.argv.length<5){
    console.log('To execute the operation please pass your password, person name, contact in consecutive order as argument.')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://psandesh64:${password}@cluster0.lhd7d2u.mongodb.net/contactApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    contact_id: String,
    number: Number
})
const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
    contact_id: process.argv[3],
    number: process.argv[4]
})

contact.save().then(result=>{
    console.log('note saved!')
    mongoose.connection.close()
})