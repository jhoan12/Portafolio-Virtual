const mongoose = require('mongoose')
const {Schema} = mongoose

const archivosSchema = new Schema({
    titulo: String,
    usuario: String,
    imageUrl: String,
    ubicacion: String
})

archivosSchema.methods.setImgUrl = function setImgUrl(filename){
    const url = 'https://jhoan12-backend-portafolio.glitch.me/'
    this.imageUrl = url+'public/'+filename
}

module.exports = mongoose.model('Archivo', archivosSchema)