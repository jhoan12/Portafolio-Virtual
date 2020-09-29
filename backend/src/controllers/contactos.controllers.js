const contactosCtrl = {}
const Contacto = require('../models/contactos.models')

contactosCtrl.agregarContactos = async (req, res) => {
    const {usuario, celular, gmail, github, linkedin} = req.body
    const contactoNuevo = new Contacto({
        usuario,
        celular,
        github,
        gmail,
        linkedin
    })
    const respuesta = await contactoNuevo.save()
    res.json({
        mensaje: 'Contactos Guardados',
        respuesta
    })
}

contactosCtrl.obtenerContactosUsuario = async (req, res) => {
    const id = req.params.id
    const respuesta = await Contacto.find({usuario: id})
    res.json(respuesta)
}

contactosCtrl.actualizarContactos = async (req, res) => {
    const id = req.params.id
    const respuesta = await Contacto.findByIdAndUpdate({_id: id}, req.body)
    res.json(respuesta)
}

contactosCtrl.eliminarContactos = async (req, res) => {
    const id = req.params.id
    const respuesta = await Contacto.findByIdAndDelete({_id: id})
    res.json(respuesta)
}

module.exports = contactosCtrl