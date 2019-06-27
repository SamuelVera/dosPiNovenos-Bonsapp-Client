import React from 'react'
import DropdownComponent from '../../Dropdowns/CountriesDropdown'
import GoBackFixedButton from '../GoBackFixedButtonComponent'

import '../AuthedFormStyles.css'

export default function UpdateUserDatosComponent(props){

    const handleSubmit = (e) => {
        if(!e.target.idpais.value){
            alert('Elige un país!!')
        }else{
            props.handleUserUpdate({
                nombre: e.target.nombre.value,
                direccion: e.target.direccion.value,
                idpais: e.target.idpais.value
            })
        }
    }

    return(<div className="authed-form-div-ext">
        <form className="authed-form"
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(e)
            }}>
                <div className="authed-form-div">
                    <label className="authed-form-label">Nombre Visible</label>
                    <input className="authed-form-input" defaultValue={props.user.nombre}
                    type='text' name='nombre' placeholder='Ingresa un nombre que sea visible' 
                    requiredtxt='CAMPO VACIO!'  minLength={3} required/>
                </div>
                <div className="authed-form-div-select" color='black'>
                    <DropdownComponent
                    defaultValue={{value: props.user.idpais,
                    label: props.pais}}
                    nameForm='idpais' required/>
                </div>
                <div className="authed-form-div">
                    <label className="authed-form-label">Dirección</label>
                    <input className="authed-form-input" defaultValue={props.user.direccion}
                    type='text' name='direccion' placeholder='Ingresa tu dirección' required
                    requiredtxt='CAMPO VACIO!'/>
                </div>
                <button className='commonButton authed-form-button'>Actualizar</button>
            </form>
            <GoBackFixedButton goBackAction={props.setUpdating} value={false}/>
    </div>)
}