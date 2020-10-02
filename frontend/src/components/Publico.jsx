import React, { useState, useEffect } from 'react'
import Axios from 'axios'



// ================ css
import '../css/sobremi.css'
import '../css/habilidades.css'
import '../css/proyectos.css'
import '../css/social.css'
 

export default function Publico(props) {

    const [datosIconos, setDatosIconos] = useState([])
    const [datosProyectos, setDatosProyectos] = useState([])
    const [datosArticulos, setDatosArticulos] = useState([])
    const [datosArchivos, setDatosArchivos] = useState([])

    // ================ contactos
    const [github, setGithub] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [gmail, setGmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')

    useEffect(() => {
        obtenerDatos()
        // eslint-disable-next-line
    }, [])

    const obtenerDatos = async () => {
        const nombreUsuario = props.match.params.nombre

        const respuestaUsuario = await Axios.get('usuario/obtenerUsuario/' + nombreUsuario)
        const idUsuario = respuestaUsuario.data._id

        const respuestaIconos = await Axios.get('iconos/public/obtenerIconosUsuario/' + idUsuario)
        setDatosIconos(respuestaIconos.data);
        // console.log('Iconos: ', respuestaIconos.data);

        const respuestaProyectos = await Axios.get('proyectos/public/obtenerProyectos/' + idUsuario)
        setDatosProyectos(respuestaProyectos.data)
        // console.log('Proyectos: ', respuestaProyectos.data);

        const respuestaArticulos = await Axios.get('acercade/public/obtenerArticulos/' + idUsuario)
        setDatosArticulos(respuestaArticulos.data)
        // console.log('Articulos: ', respuestaArticulos.data);

        const respuestaArchivos = await Axios.get('archivos/public/obtenerArchivos/' + idUsuario)
        setDatosArchivos(respuestaArchivos.data)
        // console.log('archivos: ', respuestaArchivos.data);

        const respuestaContactos = await Axios.get('contactos/public/obtenerContactos/' + idUsuario)
        if (respuestaContactos.data.length > 0) {
            setWhatsapp(respuestaContactos.data[0].celular)
            setGmail(respuestaContactos.data[0].gmail)
            setGithub(respuestaContactos.data[0].github)
            setLinkedin(respuestaContactos.data[0].linkedin)

        }
    }


    return (
        <div className="container-lg">
                {/* ===================sobre Mi================== */}

                {
                    datosArticulos.map((articulo) => (
                        <div key={articulo._id} className="pb-5 text-dark">
                            <h2 className="text-center mt-3  col-12">{articulo.titulo}</h2>
                            <div className="row">
                                <div className=" text-center imagen ml-5 mt-3 col-12 col-md-6 mx-auto">
                                    <img src={articulo.imageUrl} className="img-fluid text-center" alt={articulo.titulo} />
                                </div>
                                <div className="contenido text-center  mt-3 col-12 col-md-6 mx-auto">
                                    <h5 className="text-center mb-3">{articulo.descripcion}</h5>
                                    {
                                        datosArchivos.map((archivo) => (
                                            <div key={archivo._id} className="col-12 col-sm-5">
                                                <a className="btn btn-dark  col-12" href={archivo.imageUrl} target="blank">{archivo.titulo}</a>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
                {/* ================== habilidades */}
                <div className="col-12 mt-4 text-center">
                    <h1>Habilidades</h1>
                    <hr />
                </div>
                <div className="services-section mb-1">
                    <div className="inner-width">
                        <div className="services-container ">
                            {
                                datosIconos.map((icono) => (
                                    icono.pertenece === 'habilidades' ? <div key={icono._id} className="service-box mt-2 col-12 col-sm-6 col-md-4  ">
                                        <div className="service-icon">
                                            <i className={icono.icono}></i>
                                        </div>
                                        <div className="service-title">{icono.nombre}</div>
                                    </div> : null
                                ))
                            }

                        </div>

                    </div>
                </div>


                {/* =================== proyectos */}

                <div className="col-12 mt-5 mb-1 text-center">
                    <h1>Proyectos</h1>
                    <hr />
                </div>
                {
                    datosProyectos.map((proyecto) => (
                        <div key={proyecto._id} className="box card col-12 mb-2" >
                            <div className="row ">
                                <div className="col-md-4 text-center py-2">
                                    <img src={proyecto.imageUrl} alt={proyecto.titulo} className="card-img" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{proyecto.titulo}</h5>
                                        <p className="card-text">{proyecto.descripcion}</p>
                                        <a href={proyecto.repositorio} target="blank">Ver Codigo <i className="fab fa-github"></i></a>
                                        <div className=" text-center">
                                            <h4 className="card-title col-12">Herramientas</h4>
                                            <div className=" row text-center d-flex justify-content-between">
                                                {
                                                    datosIconos.map((icono) => (
                                                        icono.pertenece === proyecto._id ?
                                                            <div key={icono._id} className=" col-6">
                                                                <h1 className="iconosProyectos"><i className={icono.icono}></i></h1>
                                                                <h5>{icono.nombre}</h5>
                                                                <hr className="bg-info" />
                                                            </div> : null
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <a href={proyecto.link} target="blank" className="btn btn-block btn-dark">Ver <i className="far fa-eye"></i></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))
                }


                {/* ===================contactos */}
                <div className="mt-5 mb-1 text-center col-12 ">
                    <h1>Contactos</h1>
                    <hr />
                </div>
                <div className="contactos col-12 mt-2 mb-3">

                    <div className=" text-center">

                        {
                            whatsapp !== '' ? <a className=" contacto" href={`https://api.whatsapp.com/send?phone=57${whatsapp}`} target="_blank" rel='noopener noreferrer'><i className="fab fa-whatsapp"></i></a> : null
                        }
                        {
                            gmail !== '' ? <a className=" contacto" href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${gmail}&body=`} target="_blank" rel='noopener noreferrer'><i className="fab fa-google"></i></a> : null
                        }
                        {
                            github !== '' ? <a className=" contacto" href={github} target="_blank" rel='noopener noreferrer'><i className="fab fa-github"></i></a> : null
                        }
                        {
                            linkedin !== '' ? <a className=" contacto" href={linkedin} target="_blank" rel='noopener noreferrer'><i className="fab fa-linkedin"></i></a> : null
                        }
                        <hr />
                    </div>
                </div>



        </div>
    )
}
