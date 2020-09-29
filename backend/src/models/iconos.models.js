const mongoose = require('mongoose')
const {Schema} = mongoose

const IconosSchema = new Schema({
    nombre: String,
    pertenece: String,
    usuario: String,
    icono: String
})

module.exports = mongoose.model('Icono', IconosSchema)