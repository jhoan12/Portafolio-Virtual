const ArchivosCtrl = {}
const Archivo = require('../models/archivos.models.js')
const fs = require('fs')

ArchivosCtrl.agregarArchivo = async (req, res) =>{
    const {titulo, usuario} = req.body
    const archivo = new Archivo({
        titulo,
        usuario,
        ubicacion:req.file.path
    })
    if(req.file){
        const {filename} = req.file
        archivo.setImgUrl(filename)
    }
    const respuesta = await archivo.save() 
    res.json({
        mensaje: 'Archivo Guardado',
        respuesta
    })
}

ArchivosCtrl.obtenerArchivoUsuario = async (req, res) => {
    const id = req.params.id
    const respuesta = await Archivo.find({usuario: id})
    res.json(respuesta)
}

ArchivosCtrl.eliminarArchivo = async (req, res) => {
    const id = req.params.id
    const archivo = await Archivo.findByIdAndRemove({ _id: id })

    fs.unlink(archivo.ubicacion, (err) => {
        if (err) throw err;
        res.json({
            mensaje: 'Archivo Eliminado',
            archivo
        })
    });
}

module.exports = ArchivosCtrl