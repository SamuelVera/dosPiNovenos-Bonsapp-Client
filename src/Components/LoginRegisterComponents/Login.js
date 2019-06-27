import React from 'react'
import './LoginRegisterStyles.css'

function Login(props) {

    const handleSubmit = (e) => {
        props.logInUser({
            correo: e.target.correo.value,
            password: e.target.password.value
        })
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
                    type='email' name='correo' placeholder='Ingresa tú correo electrónico' required
                    requiredtxt='CAMPO VACIO!' formaterrortxt='INGRESA UN CORREO!'/>
                </div>
                <div className='login-form-div'>
                    <label className='login-form-label'>Contraseña</label>
                    <input className='login-form-input'
                    type='password' name='password' placeholder='Ingresa tú contraseña' required
                    requiredtxt='CAMPO VACIO!'/>
                </div>
                <button className='login-form-button'>Log In</button>
            </form>
            <div className='login-register'>
                <label className='login-register-label'>¿No tienes cuenta?</label>
                <button className='login-register-button' 
                onClick={() => props.setLogin(false)}
                >¡Registrate!</button>
            </div>
        </div>
    )
}

export default Login