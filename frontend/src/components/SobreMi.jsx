import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import '../css/sobremi.css'

export default function SobreMi() {

    const [datos, setDatos] = useState([])
    const [datosArchivos, setDatosArchivos] = useState([])


    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [imagen, setImagen] = useState('')

    const [tituloArchivo, setTituloArchivo] = useState('')
    const [archivo, setArchivo] = useState('')

    useEffect(() => {
        obtenerArticulo()
    }, [])

    const obtenerArticulo = async () => {
        const id = sessionStorage.getItem('idUsuario')
        const token = sessionStorage.getItem('token')

        const respuesta = await Axios.get('acercade/obtenerArticulos/' + id, {
            headers: { 'autorizacion': token }
        })
        const respuestaArchivos = await Axios.get('archivos/obtenerArchivos/' + id, {
            headers: { 'autorizacion': token }
        })

        setDatosArchivos(respuestaArchivos.data)
        setDatos(respuesta.data)
    }

    const guardarArticulo = async (e) => {
        e.preventDefault()
        const id = sessionStorage.getItem('idUsuario')
        const token = sessionStorage.getItem('token')

        const formdata = new FormData()
        formdata.append('imagen', imagen)
        formdata.append('titulo', titulo)
        formdata.append('descripcion', descripcion)
        formdata.append('usuario', id)
        const respuesta = await Axios.post('acercade/agregarArticulo', formdata, {
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
            window.location.href = "/portafolio"
        }, 1400)
    }

    const guardarArchivo = async (e) => {
        e.preventDefault()
        const id = sessionStorage.getItem('idUsuario')
        const token = sessionStorage.getItem('token')

        const formdata = new FormData()
        formdata.append('archivo', archivo)
        formdata.append('titulo', tituloArchivo)
        formdata.append('usuario', id)
        const respuesta = await Axios.post('archivos/agregarArchivo', formdata, {
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
            window.location.href = "/portafolio"
        }, 1400)
    }

    const eliminarArchivo = async (id) => {
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.delete('archivos/eliminarArchivo/' + id, {
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
            obtenerArticulo()
        }, 1400)
    }

    const eliminarArticulo = async (id) => {
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.delete('acercade/eliminarArticulo/' + id, {
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
            obtenerArticulo()
        }, 1400)
    }

    return (
        <div className=" container-xl mt-5" id="SobreMi">

            {
                datos.map((dato) => (
                    <div key={dato._id} className="row  pb-5 text-dark">
                        <h2 className="text-center mt-3  col-12" >{dato.titulo}</h2>
                        <div className=" text-center imagen ml-5 mt-3 col-12 col-md-6 mx-auto">
                            <img src={dato.imageUrl} className="img-fluid text-center" alt={dato.titulo} />
                        </div>
                        <div className="contenido text-center  mt-3 col-12 col-md-6 mx-auto">
                            <h5 className="text-center mb-3">{dato.descripcion}</h5>
                            {
                                datosArchivos.map((archivo) => (
                                    <div key={archivo._id} className="row">
                                        <a className="btn btn-dark mr-1 col-12 col-sm-5" href={archivo.imageUrl} target="blank">{archivo.titulo}</a>
                                        <Link to="#" className="btn btn-danger  col-12 col-sm-5" onClick={() => eliminarArchivo(archivo._id)} > Eliminar <i className="far fa-trash-alt"></i></Link>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="row mt-5 col-12  text-center">
                            <div className="col-12 mt-2 col-sm-6">
                                <Link to="#" className="btn btn-danger " onClick={() => eliminarArticulo(dato._id)} > Eliminar <i className="far fa-trash-alt"></i></Link>
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className="col-12 mt-2 d-flex justify-content-between py-5 row ">
                <Link to="#" className="btn mb-2 btn-dark col-12 col-sm-5" data-toggle="modal" data-target="#addArticulo" > <i className="fas fa-plus"></i> Agregar Articulo </Link>
                <Link to="#" className="btn btn-dark col-12 col-sm-5" data-toggle="modal" data-target="#addArchivo" > <i className="fas fa-plus"></i> Agregar Archivo </Link>
            </div>

            <div className="modal fade " id="addArticulo">
                <div className="modal-dialog  modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header bg-dark text-white">
                            <h5 className="modal-title">Crear Articulo</h5>
                            <button className="close" data-dismiss="modal"> <span>&times;</span> </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={guardarArticulo} >
                                <div className="form-group">
                                    <label>Titulo</label>
                                    <input type="text" autoFocus onChange={e => setTitulo(e.target.value)} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Descripcion</label>
                                    <textarea type="texto" onChange={e => setDescripcion(e.target.value)} className="form-control mb-2" placeholder="Descripcion" />
                                </div>
                                <div className="form-group">
                                    <label>Imagen</label>
                                    <div className="custom-file">
                                        <input type="file" className="form-control custom-file-input  mb-2" id="customFileLang" placeholder="Imagen" onChange={e => setImagen(e.target.files[0])} required />
                                        <label className="custom-file-label" href="customFileLang">Subir Imagen</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-dark btn-block" type="submit" > Crear </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL ARCHIVO */}
            <div className="modal fade " id="addArchivo">
                <div className="modal-dialog  modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header bg-dark text-white">
                            <h5 className="modal-title">Agregar Archivo</h5>
                            <button className="close" data-dismiss="modal"> <span>&times;</span> </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={guardarArchivo} >
                                <div className="form-group">
                                    <label>Titulo</label>
                                    <input type="text" autoFocus placeholder="Titulo" onChange={e => setTituloArchivo(e.target.value)} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Archivo</label>
                                    <div className="custom-file">
                                        <input type="file" className="form-control custom-file-input  mb-2" id="customFileLang" placeholder="Archivo" onChange={e => setArchivo(e.target.files[0])} required />
                                        <label className="custom-file-label" href="customFileLang">Subir Archivo</label>
                                    </div>
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
    )
}

