const mongoose = require('mongoose')
const {Schema} = mongoose

const contactosSchema = new Schema({
    usuario: String,
    celular: String,
    github: String,
    gmail: String,
    linkedin: String
})

module.exports = mongoose.model('Contactos', contactosSchema)