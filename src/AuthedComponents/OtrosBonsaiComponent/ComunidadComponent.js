import React from 'react'
import './ComunidadStyles.css'

export default function ComunidadComponent(props){
    return(<div className="usuarios-container">
        {
            props.usuarios.map((usuario, index) => 
            <div className="item-usuario" key={usuario.id}>
                <div className="usuario-info">
                    <h3>Usuario: {usuario.nombre}</h3>
                    <h3>Correo: {usuario.correo}</h3>
                    <h3>Pais: {usuario.pais}</h3>
                    <h3>Direccion: {usuario.direccion}</h3>
                </div>
                <div className="go-to-profile">
                    <button className="commonButton" onClick={() => {
                        props.setUsuarioViendo(usuario)
                        props.setViendoUno(true)
                    }}>Ver Perfil</button>
                </div>
            </div>)
        }
    </div>)
}