import React from 'react'
import '../css/footer.css'
import {Link} from 'react-router-dom'

export default function Footer() {
    return (
        <div className="contenedor mt-4 bg-dark">
            <div className="contenidoFooter text-center">
                <Link className="text-white" to="#" >Hecho por: <i className="text-info far fa-copyright"></i> Alexis</Link>
            </div>
        </div>
    )
}
