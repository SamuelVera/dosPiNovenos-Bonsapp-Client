import React from 'react'
import './LoginRegisterStyles.css'
import DropdownComponent from '../Dropdowns/CountriesDropdown'

/**
 * From de Registro        
 * Validación de correo, longitud de campos y requeridos hecha con atributos de html
 */
export default function Register(props) {

    const handleSubmit = (e) => {
        if(!e.target.idpais.value){
            alert('Elige un país!!')
        }else{
            props.registerUser({
                correo: e.target.correo.value,
                password: e.target.password.value,
                nombre: e.target.nombre.value,
                direccion: e.target.direccion.value,
                idpais: e.target.idpais.value
            })
        }
    }

    return(
        <div className='login'>
            <form className='login-form' 
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(e)
            }}>
                <div className="login-form-div">
                    <label className='login-form-label'>Correo electrónico </label>
                    <input className='login-form-input'
                    type='email' name='correo' placeholder='Ingresa un correo electrónico'
                    requiredtxt='CAMPO VACIO!' formaterrortxt='INGRESA UN CORREO!' required/>
                </div>
                <div className='login-form-div'>
                    <label className='login-form-label'>Contraseña</label>
                    <input className='login-form-input'
                    type='password' name='password' placeholder='Ingresa una contraseña' 
                    requiredtxt='CAMPO VACIO!'  minLength={8} required/>
                </div>
                <div className='login-form-div'>
                    <label className='login-form-label'>Nombre Visible</label>
                    <input className='login-form-input'
                    type='text' name='nombre' placeholder='Ingresa un nombre que sea visible' 
                    requiredtxt='CAMPO VACIO!'  minLength={3} required/>
                </div>
                <div className='login-form-div-select'>
                    <DropdownComponent
                    defaultValue={null}
                    className='login-form-select' nameForm='idpais' required/>
                </div>
                <div className='login-form-div'>
                    <label className='login-form-label'>Dirección</label>
                    <input className='login-form-input'
                    type='text' name='direccion' placeholder='Ingresa tu dirección' required
                    requiredtxt='CAMPO VACIO!'/>
                </div>
                <button className='login-form-button'>Registrar</button>
            </form>
            <div className='login-register'>
                <label className='login-register-label'>¿Ya tienes cuenta?</label>
                <button className='login-register-button' 
                onClick={() => props.setLogin(true)}
                >¡Utilizala!</button>
            </div>
        </div>
    )
}