const {Router} = require('express');
const route = Router()
const IconosCtrl = require('../controllers/iconos.controllers')
const Auth = require('../helpers/Auth') 

route.post('/agregarIcono', Auth.verificarToken, IconosCtrl.agregarIcono)
route.get('/obtenerIconosUsuario/:id', Auth.verificarToken, IconosCtrl.obtenerIconosUsuario)
route.get('/public/obtenerIconosUsuario/:id', IconosCtrl.obtenerIconosUsuario)
route.delete('/eliminarIcono/:id', Auth.verificarToken, IconosCtrl.eliminarIcono)

module.exports = route