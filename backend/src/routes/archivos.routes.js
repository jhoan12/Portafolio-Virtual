const {Router} = require('express')
const route = Router()
const ArchivosCtrl = require('../controllers/archivos.controllers.js')
const upload = require('../libs/upload') 
const Auth = require('../helpers/Auth')

route.post('/agregarArchivo', Auth.verificarToken, upload.single('archivo'), ArchivosCtrl.agregarArchivo)
route.get('/obtenerArchivos/:id', Auth.verificarToken, ArchivosCtrl.obtenerArchivoUsuario)
route.get('/public/obtenerArchivos/:id', ArchivosCtrl.obtenerArchivoUsuario)
route.delete('/eliminarArchivo/:id', Auth.verificarToken, ArchivosCtrl.eliminarArchivo)

module.exports = route