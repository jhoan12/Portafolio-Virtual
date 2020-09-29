import React from 'react'
import SobreMi from './SobreMi'
import Habilidades from './Habilidades'
import Proyectos from './Proyectos'
import Social from './Social'



export default function Portafolio() {
    return (
        <div className="container-xl ">
            <SobreMi/>
            <Habilidades />
            <Proyectos />
            <Social/>
        </div>
    )
}
