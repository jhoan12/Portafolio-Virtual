const {Router} = require('express')
const route = Router()
const ArticuloCtrl = require('../controllers/acercade.controllers')
const upload = require('../libs/upload')
const Auth = require('../helpers/Auth') 

route.post('/agregarArticulo', Auth.verificarToken,  upload.single('imagen'), ArticuloCtrl.agregarArticulo)
route.get('/obtenerArticulos/:id', Auth.verificarToken, ArticuloCtrl.obtenerArticuloUsuario)
route.get('/public/obtenerArticulos/:id', ArticuloCtrl.obtenerArticuloUsuario)
route.put('/actualizarArticulo/:id', Auth.verificarToken, ArticuloCtrl.actualizarArticulo)
route.delete('/eliminarArticulo/:id', Auth.verificarToken, ArticuloCtrl.eliminarArticulo)

module.exports = route