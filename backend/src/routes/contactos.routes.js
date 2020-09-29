const {Router} = require('express')
const route = Router()
const ContactosCtrl = require('../controllers/contactos.controllers')
const Auth = require('../helpers/Auth') 

route.post('/agregarContactos', Auth.verificarToken, ContactosCtrl.agregarContactos)
route.get('/obtenerContactos/:id', Auth.verificarToken, ContactosCtrl.obtenerContactosUsuario)
route.get('/public/obtenerContactos/:id', ContactosCtrl.obtenerContactosUsuario)
route.put('/actualizarContacto/:id', Auth.verificarToken, ContactosCtrl.actualizarContactos)
route.delete('/eliminarContactos/:id', Auth.verificarToken, ContactosCtrl.eliminarContactos)

module.exports = route