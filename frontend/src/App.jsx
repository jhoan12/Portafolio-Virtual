import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import Navbar from './components/Navbar';
import CrearCuenta from './components/CrearCuenta'
import Portafolio from './components/Portafolio';
import Login from './components/Login';
import AgregarProyecto from './components/AgregarProyecto';
import ActualizarProyecto from './components/ActualizarProyecto';
import Footer from './components/Footer';
import Publico from './components/Publico';


const Protegida = (props ) => {
  const token = sessionStorage.getItem('token')
  if(token){
    return  <Route {...props}/> 
  }else{
    return <Redirect to="/"/>
  }
}



function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/CrearCuenta" exact component={CrearCuenta}/>
        <Route path="/portafolio/:nombre" exact component={Publico}/>
        <Protegida path="/portafolio" exact component={Portafolio}/>
        <Protegida path="/agregarProyecto" exact component={AgregarProyecto}/>
        <Protegida path="/actualizarProyecto/:id" exact component={ActualizarProyecto}/>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
