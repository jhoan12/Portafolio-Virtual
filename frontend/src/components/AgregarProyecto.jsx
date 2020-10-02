import React, { useState } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import '../css/agregarProyecto.css'

export default function AgregarProyecto() {

    const [titulo, setTitulo] = useState('')
    const [imagen, setImagen] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [link, setLink] = useState('')
    const [repositorio, setRepositorio] = useState('')

    const guardar = async (e) => {
        e.preventDefault()

        const usuario = sessionStorage.getItem('idUsuario')
        const token = sessionStorage.getItem('token')

        if(titulo.trim() === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Olvidaste Ponerle un Titulo',
            })
            return
        }
        if(descripcion.trim() === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Olvidaste Ponerle una Descripcion',
            })
            return
        }

        const formdata = new FormData()//usamos el formData ya que es por el form data que el server nos recive las imagenes 
        formdata.append('imagen', imagen)
        formdata.append('titulo', titulo)
        formdata.append('descripcion', descripcion)
        formdata.append('link', link)
        formdata.append('usuario', usuario)
        formdata.append('repositorio', repositorio)
        const respuesta = await Axios.post('proyectos/agregarProyecto', formdata, {
            headers: { 'autorizacion': token }
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: respuesta.data.mensaje,
            showConfirmButton: false,
            timer: 1350
        })
        
        setTimeout(()=>{
            window.location.href="/portafolio"
        },1400)

    }

    return (

        <div className="container-lg">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card mb-5 fondoAgregarProyecto text-white mt-5">
                        <div className="container-lg text-center fa-6x">
                            <i className="far fa-image"></i>
                        </div>
                        <div className="card-body">
                            <form onSubmit={guardar} >
                                <div className="form-group">
                                    <h3>Titulo</h3>
                                    <input type="texto" className="form-control mb-2" placeholder="Titulo" autoFocus onChange={e => setTitulo(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <h3> Descripcion </h3>
                                    <textarea type="texto" className="form-control mb-2" placeholder="Descripcion" onChange={e => setDescripcion(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <h3> Repositorio </h3>
                                    <input type="texto" className="form-control mb-2" placeholder="Link del repositorio" onChange={e => setRepositorio(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <h3> Link </h3>
                                    <input type="texto" className="form-control mb-2" placeholder="Link del Proyecto" onChange={e => setLink(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <h3> Imagen </h3>
                                    <div className="custom-file">
                                        <input type="file" className="form-control custom-file-input  mb-2"  id="customFileLang"  placeholder="Imagen" onChange={e => setImagen(e.target.files[0])} required/>
                                        <label className="custom-file-label" href="customFileLang">Subir Imagen</label>
                                    </div>
                                </div>
                                <button className="btn btn-dark btn-block" type="submit" >Agregar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}