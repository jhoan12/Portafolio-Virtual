import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import '../css/proyectos.css'

export default function Proyectos() {

    const [datos, setDatos] = useState([])
    const [iconos, setIconos] = useState([])

    const [nombre, setNombre] = useState('')
    const [icono, setIcono] = useState('')
    const [pertenece, setPertenece] = useState('')

    useEffect(() => {
        obtenerDatos()
    }, [])

    const obtenerDatos = async () => {
        const id = sessionStorage.getItem('idUsuario')
        const token = sessionStorage.getItem('token')

        const respuestaIconos = await Axios.get('https://backen-portafolio-vitual.herokuapp.com/iconos/obtenerIconosUsuario/' + id, {
            headers: { 'autorizacion': token }
        })
        setIconos(respuestaIconos.data)

        const respuesta = await Axios.get('https://backen-portafolio-vitual.herokuapp.com/proyectos/obtenerProyectos/' + id, {
            headers: { 'autorizacion': token }
        })
        setDatos(respuesta.data)

    }

    const eliminarProyecto = async (idProyecto) => {
        const token = sessionStorage.getItem('token')
        const filtradosIconios = iconos.filter(icono => icono.pertenece === idProyecto)
        let I = 0
        while (I < filtradosIconios.length) {
            const id = filtradosIconios[I]._id
            await Axios.delete('https://backen-portafolio-vitual.herokuapp.com/iconos/eliminarIcono/' + id, {
                headers: { 'autorizacion': token }
            })
            I++
        }
        const respuesta = await Axios.delete('https://backen-portafolio-vitual.herokuapp.com/proyectos/eliminarProyecto/' + idProyecto, {
            headers: { 'autorizacion': token }
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminada',
            text: respuesta.data.mensaje,
            showConfirmButton: false,
            timer: 1450
        })
        setTimeout(() => {
            obtenerDatos()
        }, 1500)

    }

    const guardarIconoProyectos = async (e) => {
        e.preventDefault()
        const token = sessionStorage.getItem('token')
        const idUsuario = sessionStorage.getItem('idUsuario')

        const nuevo = {
            nombre,
            icono,
            pertenece,
            usuario: idUsuario
        }

        await Axios.post('https://backen-portafolio-vitual.herokuapp.com/iconos/agregarIcono', nuevo, {
            headers: { 'autorizacion': token }
        })
        setTimeout(() => {
            // window.location.href = "/portafolio"
            obtenerDatos()
        }, 200)


    }
    const eliminarIcono = async (id) => {
        const token = sessionStorage.getItem('token')
        await Axios.delete('https://backen-portafolio-vitual.herokuapp.com/iconos/eliminarIcono/' + id, {
            headers: { 'autorizacion': token }
        })
        setTimeout(() => {
            obtenerDatos()
        }, 200)
    }

    return (
        <div className="container-xl mt-5">
            <div className="col-12 text-center">
                <h1>Proyectos</h1>
                <hr />
            </div>
            <div className="col-12 mt-2 mb-3">
                <Link to="/agregarProyecto" className="btn btn-dark btn-lg btn-block">Agregar Proyecto</Link>
            </div>
            <div className="row">
                {
                    datos.map((dato) => (
                        <div key={dato._id} className="box card col-12 mb-2" >
                            <div className="row ">
                                <div className="col-md-4 py-2">
                                    <img  src={dato.imageUrl} alt={dato.titulo} className="card-img" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{dato.titulo}</h5>
                                        <p className="card-text">{dato.descripcion}</p>
                                        <a href={dato.repositorio} target="blank">Ver Codigo <i className="fab fa-github"></i></a>
                                        <div className=" text-center">
                                            <h4 className="card-title col-12">Herramientas</h4>
                                            <div className=" row text-center d-flex justify-content-between">
                                                {
                                                    iconos.map((icono) => (
                                                        icono.pertenece === dato._id ?
                                                            <div key={icono._id} className=" col-6">
                                                                <h1><i className={icono.icono}></i></h1>
                                                                <h5>{icono.nombre}</h5>
                                                                <Link to="#" className="btn m-1 btn-danger" onClick={() => eliminarIcono(icono._id)} > <i className="far fa-trash-alt"></i></Link>
                                                                <hr className="bg-info" />
                                                            </div> : null
                                                    ))
                                                }
                                            </div>

                                        </div>

                                        <div className="col-12 text-center  ">
                                            <Link to="#" className="btn btn-dark btn-block" data-toggle="modal" data-target="#addIconoProyectos" onClick={() => setPertenece(dato._id)} > <i className="fas fa-plus"></i> Agregar Icono </Link>
                                        </div>
                                        <hr />
                                        <div className="col-12 pb-3">
                                            <Link to="#" className="btn btn-danger btn-block" onClick={() => eliminarProyecto(dato._id)} > Eliminar <i className="tamanoFuenteProyectos far fa-trash-alt"></i></Link>
                                            <Link to={"/actualizarProyecto/" + dato._id} className="btn btn-primary btn-block" > Actualizar <i className="tamanoFuenteProyectos far fa-edit"></i></Link>
                                            <a href={dato.link} target="blank" className="btn btn-block btn-dark">Ver <i className="far fa-eye"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    ))
                }


                <div className="modal fade " id="addIconoProyectos">
                    <div className="modal-dialog  modal-lg">
                        <div className="modal-content ">
                            <div className="modal-header bg-dark text-white">
                                <h5 className="modal-title">Agregar Icono</h5>
                                <button className="close" data-dismiss="modal"> <span>&times;</span> </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={guardarIconoProyectos} >
                                    <div className="form-group">
                                        <label>Nombre Icono</label>
                                        <input type="text" autoFocus onChange={e => setNombre(e.target.value)} className="form-control" placeholder="Nombre Icono" required />

                                    </div>
                                    <div className="form-group">
                                        <label>Icono</label>
                                        <input type="texto" onChange={e => setIcono(e.target.value)} className="form-control mb-2" placeholder="Icono" />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-dark btn-block" type="submit" > Agregar </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    )
}
