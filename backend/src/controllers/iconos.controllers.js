const IconosCtrl = {}
const Icono = require('../models/iconos.models')

IconosCtrl.agregarIcono = async (req, res) => {
    const {nombre, usuario, pertenece, icono} = req.body
    const nuevoIcono = new Icono({
        nombre,
        usuario,
        pertenece,
        icono
    })
    const respuesta = await nuevoIcono.save()
    res.json({
        mensaje: 'Icono Guardado',
        respuesta
    })
}
IconosCtrl.obtenerIconosUsuario = async (req, res) => {
    const id = req.params.id
    const respuesta = await Icono.find({usuario: id})
    res.json(respuesta)
}
IconosCtrl.eliminarIcono = async (req, res) => {
    const id = req.params.id
    const respuesta = await Icono.findByIdAndDelete({_id: id})
    res.json({
        mensaje: 'Icono Eliminado',
        respuesta
    })
}

module.exports = IconosCtrl