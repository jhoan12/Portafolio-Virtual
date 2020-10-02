import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Link as Seccion } from 'react-scroll'

import Axios from 'axios'
import Swal from 'sweetalert2'

export default function Navbar() {

    const [menu, setMenu] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setMenu(true)
        }
    }, [])


    const salir = () => {
        sessionStorage.clear()
        window.location.href = "/"
    }
    
    const eliminar = async () => {

        const id = sessionStorage.getItem('idUsuario')
        const respuesta = await Axios.delete('usuario/eliminarCuenta/' + id)
        // console.log(respuesta);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminada',
            text: respuesta.data.mensaje,
            showConfirmButton: false,
            timer: 1450
        })
        setTimeout(() => {
            sessionStorage.clear()
            window.location.href = "/"
        }, 1500)
    }

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-lg ">
                <Link className="navbar-brand mx-auto" to="#">Alexis Guzman <i className="fas fa-code"></i> </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                {
                    menu ? <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <Seccion className="nav-link" to="SobreMi" spy={true} smooth={true} offset={-50} duration={1500}>Sobre Mí </Seccion>
                            <Seccion className="nav-link" to="Habilidades" spy={true} smooth={true} offset={-55} duration={1500}>Habilidades</Seccion>
                            <Seccion className="nav-link" to="Proyectos" spy={true} smooth={true} offset={-50} duration={1500} >Proyectos</Seccion>
                            <Seccion className="nav-link" to="Contactos" spy={true} smooth={true} offset={-50} duration={1500}>Contactos</Seccion>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Salir <i className="fas fa-sign-out-alt"></i> </Link>
                                <div className="dropdown-menu bg-secondary " aria-labelledby="navbarDropdown">
                                    <Link className=" dropdown-item" to="#" onClick={() => salir()} > Salir <i className="fas fa-sign-out-alt"></i> </Link>
                                    <Link className=" dropdown-item" to="#" onClick={() => eliminar()}> Borrar Cuenta <i className="fas fa-trash-alt"></i> </Link>
                                </div>
                            </li>
                        </ul>
                    </div> : <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Seccion className="nav-link " to="SobreMi" spy={true} smooth={true} offset={-50} duration={900}>Sobre Mí </Seccion>
                                <Seccion className="nav-link" to="Habilidades" spy={true} smooth={true} offset={-55} duration={900}>Habilidades</Seccion>
                                <Seccion className="nav-link" to="Proyectos" spy={true} smooth={true} offset={-50} duration={900}>Proyectos</Seccion>
                                <Seccion className="nav-link" to="Contactos" spy={true} smooth={true} offset={-50} duration={900}>Contactos</Seccion>
                            </div>
                        </div>
                }
            </div>
        </nav>
    )
}