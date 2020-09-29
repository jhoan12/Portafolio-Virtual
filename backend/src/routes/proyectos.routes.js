const {Router} = require('express')
const route = Router()
const ProyectosCtrl = require('../controllers/proyectos.controllers')
const upload = require('../libs/upload')
const Auth = require('../helpers/Auth') 

route.post('/agregarProyecto', Auth.verificarToken, upload.single('imagen'), ProyectosCtrl.agregarProyecto)
route.get('/obtenerProyectos/:id', Auth.verificarToken, ProyectosCtrl.obtenerProyectoUsuario)
route.get('/public/obtenerProyectos/:id', ProyectosCtrl.obtenerProyectoUsuario)
route.get('/obtenerProyecto/:id', Auth.verificarToken, ProyectosCtrl.obtenerProyectoId)
route.put('/actualizarProyecto/:id', Auth.verificarToken, ProyectosCtrl.actualizarProyecto)
route.delete('/eliminarProyecto/:id', Auth.verificarToken, ProyectosCtrl.eliminarProyecto)

module.exports = route