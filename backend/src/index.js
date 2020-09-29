const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const bodyparser = require('body-parser')
require('./database')

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use('/public', express.static(__dirname+'/storage/galeria'))

//el morgan  sirve para ver las peticiones que nos hace el cliente
app.use(morgan('dev'));

//el bodyparser y express.json nos sirve para recibir y traducir lo que nos envia el frontend, ya que desde el frontend se va a mandar los datos en formato json
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(express.json());

//cors sirve para permitir las peticiones del cliente
app.use(cors({ origin: '*' }));

//routes
app.use('/usuario', require('./routes/usuario.routes'));
app.use('/acercade', require('./routes/acercade.routes'));
app.use('/archivos', require('./routes/archivos.routes'));
app.use('/iconos', require('./routes/iconos.routes'));
app.use('/proyectos', require('./routes/proyectos.routes'));
app.use('/contactos', require('./routes/contactos.routes'))

//starting the server
app.listen(app.get('port'), () => {
    console.log('escuchando por el puerto', app.get('port'));
})