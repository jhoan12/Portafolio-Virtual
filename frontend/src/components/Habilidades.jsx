import React, { useState, useEffect } from 'react'
import '../css/habilidades.css'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Habilidades() {

    const [datos, setDatos] = useState([])

    const [nombre, setNombre] = useState('')
    const [pertenece, setPertenece] = useState('')
    const [icono, setIcono] = useState('')

    useEffect(() => {
        obtenerDatos()
    }, [])

    const obtenerDatos = async () => {
        const id = sessionStorage.getItem('idUsuario')
        const token = sessionStorage.getItem('token')

        const respuesta = await Axios.get('https://backen-portafolio-vitual.herokuapp.com/iconos/obtenerIconosUsuario/' + id, {
            headers: { 'autorizacion': token }
        })
        setDatos(respuesta.data);
    }

    const eliminarIcono = async (id) => {
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.delete('https://backen-portafolio-vitual.herokuapp.com/iconos/eliminarIcono/' + id, {
            headers: { 'autorizacion': token }
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: respuesta.data.mensaje,
            showConfirmButton: false,
            timer: 1350
        })
        setTimeout(() => {
            obtenerDatos()
        }, 1400)

    }

    const guardarIconoHbilidades = async (e) => {
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
            // window.location.href = `/portafolio`
            obtenerDatos()
        }, 500)
        

    }

    return (
        <div className="container-xl">
            <div className="col-12 text-center">
                <h1>Habilidades</h1>
                <hr />
            </div>
            <div className="services-section">
                <div className="inner-width">
                    <div className="services-container row">
                        {
                            datos.map((dato, i) => (
                                dato.pertenece === 'habilidades' ? <div key={dato._id} className="service-box mt-5 col-12 col-sm-6 col-md-4  ">
                                    <div className="service-icon">
                                        <i className={dato.icono}></i>
                                    </div>
                                    <div className="service-title">{dato.nombre}</div>
                                    <div className="">
                                        <button className="btn btn-danger btn-block" onClick={() => eliminarIcono(dato._id)} >Eliminar</button>
                                    </div>
                                </div> : null
                            ))
                        }

                    </div>
                    <div className="col-12 text-center mt-2 py-5  ">
                        <Link to="#" className="btn btn-dark " data-toggle="modal" data-target="#addIcono" onClick={() => setPertenece('habilidades')} > <i className="fas fa-plus"></i> Agregar Icono </Link>
                    </div>

                    <div className="modal fade " id="addIcono">
                        <div className="modal-dialog  modal-lg">
                            <div className="modal-content ">
                                <div className="modal-header bg-dark text-white">
                                    <h5 className="modal-title">Agregar Icono</h5>
                                    <button className="close" data-dismiss="modal"> <span>&times;</span> </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={guardarIconoHbilidades} >
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
        </div>
    )
}
