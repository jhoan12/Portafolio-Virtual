const ProyectosCtrl = {}
const Proyecto = require('../models/proyectos.models')
const fs = require('fs')

ProyectosCtrl.agregarProyecto = async (req, res) =>{
    const {titulo, descripcion, usuario, repositorio, link} = req.body
    const proyecto = new Proyecto({
        titulo,
        descripcion,
        usuario,
        repositorio,
        ubicacion: req.file.path,
        link
    })
    if(req.file){
        const {filename} = req.file
        proyecto.setImgUrl(filename)
    }
    const respuesta = await proyecto.save() 
    res.json({
        mensaje: 'Proyecto Guardado',
        respuesta
    })
}

ProyectosCtrl.actualizarProyecto = async (req, res) => {
    const id = req.params.id
    const respuesta = await Proyecto.findByIdAndUpdate({_id: id}, req.body)
    res.json({
        mensaje: 'Datos Actualizados',
        respuesta
    })
}

ProyectosCtrl.obtenerProyectoUsuario = async (req, res) => {
    const id = req.params.id
    const respuesta = await Proyecto.find({usuario: id})
    res.json(respuesta)
}

ProyectosCtrl.obtenerProyectoId = async (req, res) => {
    const id = req.params.id
    const respuesta = await Proyecto.findById({_id: id})
    res.json(respuesta)
}

ProyectosCtrl.eliminarProyecto = async (req, res) => {
    const id = req.params.id
    const proyecto = await Proyecto.findByIdAndRemove({ _id: id })

    fs.unlink(proyecto.ubicacion, (err) => {
        if (err) throw err;
        res.json({
            mensaje: 'Proyecto Eliminado',
            proyecto
        })
    });
}

module.exports = ProyectosCtrl