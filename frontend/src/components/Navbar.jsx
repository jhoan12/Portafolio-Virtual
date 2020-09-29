import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Axios from 'axios'
import Swal from 'sweetalert2'

export default function Navbar() {

    const [menu, setMenu] = useState(false)
    
    const [articulos, setArticulos] = useState([])
    const [archivos, setArchivos] = useState([])
    const [proyectos, setProyectos] = useState([])
    const [iconos, setIconos] = useState([])
    const [contactos, setContactos] = useState([])


    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setMenu(true)
        }
        obtenerDatos()

    }, [])


    const salir = () => {
        sessionStorage.clear()
        window.location.href = "/"
    }
    const obtenerDatos = async () => {
        const id = sessionStorage.getItem('idUsuario')
        const token = sessionStorage.getItem('token')

        const respuestaArticulos = await Axios.get('https://backen-portafolio-vitual.herokuapp.com/acercade/obtenerArticulos/' + id, {
            headers: { 'autorizacion': token }
        })
        setArticulos(respuestaArticulos.data)
        
        const respuestaArchivos = await Axios.get('https://backen-portafolio-vitual.herokuapp.com/archivos/obtenerArchivos/' + id, {
            headers: { 'autorizacion': token }
        })
        setArchivos(respuestaArchivos.data)
        
        const respuestaProyectos = await Axios.get('https://backen-portafolio-vitual.herokuapp.com/proyectos/obtenerProyectos/' + id, {
            headers: { 'autorizacion': token }
        })
        setProyectos(respuestaProyectos.data)
        
        const respuestaIconos = await Axios.get('https://backen-portafolio-vitual.herokuapp.com/iconos/obtenerIconosUsuario/' + id, {
            headers: { 'autorizacion': token }
        })
        setIconos(respuestaIconos.data)

        const respuestaContactos = await Axios.get('https://backen-portafolio-vitual.herokuapp.com/contactos/obtenerContactos/' + id, {
            headers: { 'autorizacion': token }
        })
        setContactos(respuestaContactos.data)
        
    }

    const eliminarContenido = async () => {
        const token = sessionStorage.getItem('token')

        let a = 0
        while (a < articulos.length){
            const id = articulos[a]._id
            await Axios.delete('https://backen-portafolio-vitual.herokuapp.com/acercade/eliminarArticulo/' + id, {
                headers: { 'autorizacion': token }
            })
            a++
        }

        let e = 0
        while (e < archivos.length){
            const id = archivos[e]._id
            await Axios.delete('https://backen-portafolio-vitual.herokuapp.com/archivos/eliminarArchivo/' + id, {
                headers: { 'autorizacion': token }
            })
            e++
        }

        let i = 0
        while (i < proyectos.length){
            const id = proyectos[i]._id
            await Axios.delete('https://backen-portafolio-vitual.herokuapp.com/proyectos/eliminarProyecto/' + id, {
                headers: { 'autorizacion': token }
            })
            i++
        }

        let o = 0
        while (o < iconos.length){
            const id = iconos[o]._id
            await Axios.delete('https://backen-portafolio-vitual.herokuapp.com/iconos/eliminarIcono/' + id, {
                headers: { 'autorizacion': token }
            })
            o++
        }

        let u = 0
        while (u < contactos.length){
            const id = contactos[u]._id
            await Axios.delete('https://backen-portafolio-vitual.herokuapp.com/contactos/eliminarContactos/' + id, {
                headers: { 'autorizacion': token }
            })
            u++
        }
    }

    const eliminar = async () => {

        eliminarContenido()

        const id = sessionStorage.getItem('idUsuario')
        const respuesta = await Axios.delete('https://backen-portafolio-vitual.herokuapp.com/usuario/eliminarCuenta/' + id)
        // console.log(respuesta);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminada',
            text: respuesta.data.mensaje,
            showConfirmButton: false,
            timer: 1450
        })
        setTimeout(()=>{
            sessionStorage.clear()
            window.location.href = "/"
        }, 1500)
    }

    return (
        <nav className="navbar  navbar-expand-lg navbar-dark bg-dark">
            <div className="container-lg ">
                <Link className="navbar-brand mx-auto" to="#">Alexis Guzman <i className="fas fa-code"></i> </Link>
                {
                    menu ? <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> : null
                }

                {
                    menu ? <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Salir <i className="fas fa-sign-out-alt"></i> </Link>
                                <div className="dropdown-menu bg-secondary " aria-labelledby="navbarDropdown">
                                    <Link className=" dropdown-item" to="#" onClick={() => salir()} > Salir <i className="fas fa-sign-out-alt"></i> </Link>
                                    <Link className=" dropdown-item" to="#" onClick={() => eliminar()}> Borrar Cuenta <i className="fas fa-trash-alt"></i> </Link>
                                </div>
                            </li>
                        </ul>
                    </div> : null
                }
            </div>
        </nav>
    )
}