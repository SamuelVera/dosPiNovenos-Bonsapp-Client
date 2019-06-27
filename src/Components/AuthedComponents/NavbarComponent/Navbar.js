import React from 'react'
import axios from 'axios'
import './NavbarStyles.css'

function Navbar(props){
    return(
        <div className="navbar-div">
            <div className='wrapper'/>
            <div className='navbar'>
                <button onClick={() => {
                    props.setInProfile(true)
                    props.setInGuias(false)
                    props.setInOtrosBonsai(false)
                }}className='navbar-item'>
                    Perfil
                </button>
                <button onClick={() => {
                    props.setInProfile(false)
                    props.setInGuias(true)
                    props.setInOtrosBonsai(false)
                }}className='navbar-item'>
                    Guías
                </button>
                <button onClick={() => {
                    props.setInProfile(false)
                    props.setInGuias(false)
                    props.setInOtrosBonsai(true)
                }}
                className='navbar-item'>
                    Otros Usuarios
                </button>
                <button  className='navbar-item' 
                onClick={() => {
                    axios.get('logout').then(res => {
                        alert(res.data.msg)
                            props.setAuthed(false)
                    })
                }}>Desconectarse</button>
            </div>
        </div>)
}

export default Navbar