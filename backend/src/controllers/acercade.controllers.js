const acercadeCtrl = {}
const Articulo = require('../models/acercade.models')
const fs = require('fs')

acercadeCtrl.agregarArticulo = async (req, res) =>{
    const {titulo, descripcion, usuario} = req.body
    const articulo = new Articulo({
        titulo,
        descripcion,
        usuario,
        ubicacion: req.file.path
    })
    if(req.file){
        const {filename} = req.file
        articulo.setImgUrl(filename)
    }
    const respuesta = await articulo.save() 
    res.json({
        mensaje: 'Articulo Guardado',
        respuesta
    })
}

acercadeCtrl.obtenerArticuloUsuario = async (req, res) => {
    const id = req.params.id
    const respuesta = await Articulo.find({usuario: id})
    res.json(respuesta)
}

acercadeCtrl.actualizarArticulo = async (req, res) => {
    const id = req.params.id
    const respuesta = await Articulo.findByIdAndUpdate({_id: id}, req.body)
    res.json({
        mensaje: 'Datos Actualizados',
        respuesta
    })
}

acercadeCtrl.eliminarArticulo = async (req, res) => {
    const id = req.params.id
    const articulo = await Articulo.findByIdAndRemove({ _id: id })

    fs.unlink(articulo.ubicacion, (err) => {
        if (err) throw err;
        res.json({
            mensaje: 'Articulo Eliminado',
            articulo
        })
    });
}

module.exports = acercadeCtrl