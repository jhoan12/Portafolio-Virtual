const {Router} = require('express')
const route = Router()
const usuariosCtrl = require('../controllers/usuario.controllers')
const usuarioCtrl = require('../controllers/usuario.controllers')


route.get('/obtenerUsuario/:nombre', usuarioCtrl.obtenerUsuarioNombre)
route.get('/usuarios', usuarioCtrl.obtenerUsuarios)
route.post('/crearCuenta', usuariosCtrl.crearUsuario)
route.post('/login', usuariosCtrl.login)
route.delete('/eliminarCuenta/:id', usuariosCtrl.eliminar)

module.exports = route