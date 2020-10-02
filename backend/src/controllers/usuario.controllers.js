const usuarioCtrl = {}
const Usuario = require('../models/usuario.models')
const SobreMi = require('../models/acercade.models')
const Archivos = require('../models/archivos.models')
const Contactos = require('../models/contactos.models')
const Iconos = require('../models/iconos.models')
const Proyectos = require('../models/proyectos.models')
const fs = require('fs')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



usuarioCtrl.crearUsuario = async (req, res) => {
    const {nombre, correo, contrasena} = req.body
    const nuevoUsuario = new Usuario({
        nombre,
        correo,
        contrasena
    })
    const correoUsuario = await Usuario.findOne({correo: correo})
    if(correoUsuario){
        res.json({mensaje: 'El Correo ya Existe'})
        
    }else{
        nuevoUsuario.contrasena = await bcrypt.hash(contrasena, 10)
        const token = jwt.sign({_id: nuevoUsuario._id}, 'admin')
        await nuevoUsuario.save()
        res.json({
            mensaje: 'Bienvenido',
            id: nuevoUsuario._id,
            nombre: nuevoUsuario.nombre,
            correo: nuevoUsuario.correo,
            token
        })
    }
}

usuarioCtrl.obtenerUsuarios = async (req, res) => {
    const respuesta = await Usuario.find()
    res.json(respuesta)
}

usuarioCtrl.obtenerUsuarioNombre = async (req, res) => {
    const nombre = req.params.nombre
    const respuesta = await Usuario.findOne({nombre: nombre})
    res.json(respuesta)
}

usuarioCtrl.login = async (req, res) =>{
    const {correo, contrasena} = req.body
    const usuario = await Usuario.findOne({correo: correo})
    if(!usuario){
        return res.json({mensaje: 'Correo Incorrecto'})
    }
    const comparar = await bcrypt.compare(contrasena, usuario.contrasena)
    if(comparar){
        const token = jwt.sign({_id: usuario._id}, 'admin')
        res.json({
            mensaje: 'Bienvenido',
            id: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            token
        })
    }else{
        res.json({mensaje: 'Contraseña Incorrecta'})
    }
}

usuarioCtrl.eliminar = async (req, res, next) => {
    const ubicaciones = []
    const id = req.params.id

    const sobremi = await SobreMi.find({usuario: id})
    const archivos = await Archivos.find({usuario: id})
    const proyectos = await Proyectos.find({usuario: id})
    
    for(let i = 0; i < sobremi.length; i++){
        ubicaciones.push(sobremi[i].ubicacion)
    }
    for(let i = 0; i < archivos.length; i++){
        ubicaciones.push(archivos[i].ubicacion)
    }
    for(let i = 0; i < proyectos.length; i++){
        ubicaciones.push(proyectos[i].ubicacion)
    }

    try {
        const id = req.params.id
        await SobreMi.deleteMany({usuario: id})
        await Archivos.deleteMany({usuario: id})
        await Iconos.deleteMany({usuario: id})
        await Contactos.deleteMany({usuario: id})
        await Proyectos.deleteMany({usuario: id})
        await Usuario.findByIdAndDelete({_id: id})
        res.json({mensaje: 'Adios :( '})
    } catch (error) {
        res.json({
            mensaje: 'ERROR', error
        })
        next(error)
    }

    for(let i = 0; i < ubicaciones.length; i++){
        fs.unlink(ubicaciones[i], (err) => {
            if (err) throw err;
        });
    }
}

module.exports = usuarioCtrl