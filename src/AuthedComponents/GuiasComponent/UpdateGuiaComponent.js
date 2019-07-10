import React from 'react'
import IdiomaDropdown from '../../Dropdowns/IdiomasDropdown'
import GoBackFixedButtonComponent from '../GoBackFixedButtonComponent'

import './GuiasStyles.css'

/**
 * Form para actualizar datos de una guía
 */
export default function UpdateGuiaComponent(props){

    const handleSubmit = e => {
        if(!e.target.ididioma){
            alert('Seleccione un idioma para la guia')
        }else{
            let guia = {
                nombre: e.target.nombre.value,
                ididioma: e.target.ididioma.value
            }
            props.handleSubmit(guia)
        }
    }

    return(
        <div className='authed-form-div-ext'>
            {
                props.uploadingGuia &&
                <h2>Actualizando guia...</h2>
            }
            <form className='authed-form' onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(e)
            }}>
                <div className='authed-form-div'>
                    <label className='authed-form-label'>Nombre de la Guia:</label>
                    <input className='authed-form-input' placeholder='Nombre de la guia' type='text' name='nombre' required
                    defaultValue={props.guia.nombre}/>
                </div>
                <div className='authed-form-div-select'>
                    <IdiomaDropdown defaultValue={{value: props.guia.idioma.isocode,
                    label: props.guia.idioma.nombre}} nameForm='ididioma'/>
                </div>
                <button className='commonButton authed-form-button' type='submit'>Actualizar Guía</button>
                
            </form>
            <GoBackFixedButtonComponent goBackAction={props.setUpdating} value={false}/>
        </div>
    )
}