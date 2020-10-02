const mongoose = require('mongoose')
const {Schema} = mongoose

const proyectosSchema = new Schema({
    titulo: String,
    descripcion: String,
    repositorio: String,
    usuario: String,
    imageUrl: String,
    ubicacion: String,
    link: String
})

proyectosSchema.methods.setImgUrl = function setImgUrl(filename){
    const url = 'https://jhoan12-backend-portafolio.glitch.me/'
    this.imageUrl = url+'public/'+filename
}

module.exports = mongoose.model('Proyecto', proyectosSchema)