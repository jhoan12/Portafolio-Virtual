import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'

import '../css/actualizarProyecto.css'

export default function ActualizarProyecto(props) {

    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [imagen, setImagen] = useState('')
    const [link, setLink] = useState('')
    const [repositoiro, setRepositoiro] = useState('')

    useEffect(() => {
        obtenerProyecto()
        // eslint-disable-next-line
    }, [])

    const obtenerProyecto = async () => {
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('proyectos/obtenerProyecto/' + id, {
            headers: { 'autorizacion': token }
        })
        setRepositoiro(respuesta.data.repositorio)
        setLink(respuesta.data.link)
        setTitulo(respuesta.data.titulo)
        setDescripcion(respuesta.data.descripcion)
        setImagen(respuesta.data.imageUrl)
        
    }

    const acatualizar = async (e) => {
        e.preventDefault()
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')

        const actualizar = {
            titulo,
            descripcion,
            repositoiro,
            link,
            usuario: sessionStorage.getItem('idUsuario'),
            pertenece: props.match.params.id
        }
         await Axios.put('proyectos/actualizarProyecto/' + id, actualizar, {
            headers: { 'autorizacion': token }
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Proyecto Actualizado',
            showConfirmButton: false,
            timer: 1380
        })
        setTimeout(() => {
            window.location.href = "/portafolio"
        }, 1400)

    }

    return (

        <div className="container-lg">
            <div className="row">
                <div className="col-md-6 mb-5 mx-auto">
                    <div className="card fondoActualizarProyecto text-white mt-5">
                        <div className="container-lg text-center mt-3 fa-6x">
                            <img src={imagen} className="card-img-top" alt={titulo} />
                        </div>
                        <div className="card-body">
                            <form onSubmit={acatualizar} >
                                <div className="form-group">
                                    <h3>Titulo</h3>
                                    <input type="texto" className="form-control mb-2" value={titulo} autoFocus onChange={e => setTitulo(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <h3> Descripcion </h3>
                                    <textarea type="texto" className="form-control mb-2" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <h3> Repositorio </h3>
                                    <input type="texto" className="form-control mb-2" value={repositoiro} onChange={e => setRepositoiro(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <h3> Link </h3>
                                    <input type="texto" className="form-control mb-2" value={link} onChange={e => setLink(e.target.value)} />
                                </div>
                                <button className="btn btn-dark btn-block" type="submit" >Actualizar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}