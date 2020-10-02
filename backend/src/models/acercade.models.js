const mongoose = require('mongoose')
const {Schema} = mongoose

const acercadeSchema = new Schema({
    titulo: String,
    descripcion: String,
    usuario: String,
    imageUrl: String,
    ubicacion: String
})

acercadeSchema.methods.setImgUrl = function setImgUrl(filename){
    const url = 'https://jhoan12-backend-portafolio.glitch.me/'
    this.imageUrl = url+'public/'+filename
}

module.exports = mongoose.model('Acercade', acercadeSchema)