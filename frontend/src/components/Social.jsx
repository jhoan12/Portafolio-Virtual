import React, { useState, useEffect } from 'react'
import '../css/social.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'

export default function Social() {

    const [github, setGithub] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [gmail, setGmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [idContacto, setIdContacto] = useState('')

    useEffect(() => {
        obtenerContactos()
    }, [])

    const obtenerContactos = async () => {
        const id = sessionStorage.getItem('idUsuario')
        const token = sessionStorage.getItem('token')

        const respuesta = await Axios.get('https://backen-portafolio-vitual.herokuapp.com/contactos/obtenerContactos/' + id, {
            headers: { 'autorizacion': token }
        })
        
        if (respuesta.data.length > 0) {
            
            setWhatsapp(respuesta.data[0].celular)
            setGmail(respuesta.data[0].gmail)
            setGithub(respuesta.data[0].github)
            setLinkedin(respuesta.data[0].linkedin)
            setIdContacto(respuesta.data[0]._id)
        } else {
            return 
        }
    }

    const guardarContacto = async (e) => {
        e.preventDefault()
        const id = sessionStorage.getItem('idUsuario')
        const token = sessionStorage.getItem('token')

        const nuevoContacto = {
            github,
            linkedin,
            celular: whatsapp,
            gmail,
            usuario: id
        }
        
         await Axios.post('https://backen-portafolio-vitual.herokuapp.com/contactos/agregarContactos',nuevoContacto, {
            headers: { 'autorizacion': token }
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Contactos Guardados',
            showConfirmButton: false,
            timer: 1350
        })
        setTimeout(() => {
            window.location.href = "/portafolio"
        }, 1400)
    }

    const eliminarContacto = async () => {
        const id = idContacto
        const token = sessionStorage.getItem('token')
        await Axios.delete('https://backen-portafolio-vitual.herokuapp.com/contactos/eliminarContactos/' + id, {
            headers: { 'autorizacion': token }
        })
        setWhatsapp('')
        setGmail('')
        setLinkedin('')
        setGithub('')
        setIdContacto('')
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Contacto Eliminado',
            showConfirmButton: false,
            timer: 1350
        })
        
        setTimeout(() => {
            obtenerContactos()
        }, 1400)
    }

    return (
        <div className=" container-lg">
            <div className="contactos mt-2 mb-3 row">
                
                <h1 className="col-12 text-center">Contactos</h1> 
                
                
                <div className=" text-center">
                <hr/>
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
                </div>
            </div>
            <div className="row text-center mt-4">
                <div className="col-6 col-12 mt-2 col-sm-6 ">
                    <Link to="#" className="btn btn-dark" data-toggle="modal" data-target="#addContacto" > <i className="fas fa-plus"></i> Agregar Contacto </Link>
                </div>
                {
                    idContacto !== '' ?
                        <div className="col-6 col-12 mt-2 col-sm-6 ">
                            <Link to="#" className="btn btn-danger " onClick={() => eliminarContacto()} > Eliminar <i className="far fa-trash-alt"></i></Link>
                        </div> : null
                }
            </div>

            <div className="modal fade bg-secondary" id="addContacto">
                <div className="modal-dialog  modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header bg-dark text-white">
                            <h5 className="modal-title">Agregar Contacto</h5>
                            <button className="close" data-dismiss="modal"> <span>&times;</span> </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={guardarContacto} >
                                <div className="form-group">
                                    <label>GitHub</label>
                                    <input type="text" onChange={e => setGithub(e.target.value)} autoFocus className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Linkedin</label>
                                    <input type="text" onChange={e => setLinkedin(e.target.value)} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Gmail</label>
                                    <input type="text" onChange={e => setGmail(e.target.value)} className="form-control"  />
                                </div>
                                <div className="form-group">
                                    <label>Whatsapp</label>
                                    <input type="number" onChange={e => setWhatsapp(e.target.value)} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-dark btn-block" type="submit" > Crear </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}