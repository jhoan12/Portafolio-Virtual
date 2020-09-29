const mongoose = require('mongoose')
const {Schema} = mongoose

const archivosSchema = new Schema({
    titulo: String,
    usuario: String,
    imageUrl: String,
    ubicacion: String
})

archivosSchema.methods.setImgUrl = function setImgUrl(filename){
    const url = 'https://backen-portafolio-vitual.herokuapp.com/'
    this.imageUrl = url+'public/'+filename
}

module.exports = mongoose.model('Archivo', archivosSchema)