const mongoose = require('mongoose')
const {Schema} = mongoose

const UsuarioSchema = new Schema({
    nombre: String,
    correo: String,
    contrasena: String
})

module.exports = mongoose.model('Usuario', UsuarioSchema)