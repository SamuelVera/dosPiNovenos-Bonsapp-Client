import React from 'react'
import axios from 'axios'
import GoBackFixedButtonComponent from '../GoBackFixedButtonComponent'
import EspeciesDropdown from '../../Dropdowns/EspeciesDropdow'
import TipoFormaDropdown from '../../Dropdowns/TipoFormaDropdown'

import '../AuthedFormStyles.css'

export default function UpdateBonsaiFormComponent(props){

    const handleSubmit = (e) => {
        if(!e.target.especie){
            alert('Elige la especie de tu bonsai')
        }else if(!e.target.tipoforma){
            alert('Elige el tipo de forma de tu bonsai')
        }else{
            props.setUploadingBosai(true)
            axios.post('/update-bonsai',{
                id: props.bonsai.id,
                apodo: e.target.apodo.value,
                fechacultivo: e.target.fechacultivo.value,
                altura: e.target.tamano.value,
                idespecie: e.target.especie.value,
                idforma: e.target.tipoforma.value
            })
            .then(res => {
                const { status, msg } = res.data
                alert(msg)
                if(status === 2){
                    props.setUpdating(false)
                    props.setControl(!props.control)
                }
                props.setUploadingBosai(false)
            })
            .catch(err => {
                throw err
            })
        }
    }

    return(    
    <div className='authed-form-div-ext'>
        {
            props.updatingBonsai &&
            <h2>Actualizando Bonsai...</h2>
        }
        <form className='authed-form' 
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(e)
        }}>
            <div className="authed-form-div">
                <label className='authed-form-label'>Apodo o nickname</label>
                <input className='authed-form-input'
                type='text' name='apodo' placeholder='Ingresa un Apodo'
                minLength={0} maxLength={20} defaultValue={props.bonsai.apodo}/>
            </div>
            <div className='authed-form-div'>
                <label className='authed-form-label'>Tamaño (cm)</label>
                <input className='authed-form-input'
                type='number' name='tamano' placeholder='Ingresa el tamaño del bonsai' 
                defaultValue={props.bonsai.altura} requiredtxt='CAMPO VACIO!' min={0} max={500} required/>
            </div>
            <div className='authed-form-div'>
                <label className='authed-form-label'>Fecha de Cultivo</label>
                <input className='authed-form-input'
                type='date' name='fechacultivo' placeholder='Ingresa la fecha de cultivo del bonsai' required
                requiredtxt='CAMPO VACIO!' defaultValue={props.bonsai.fechacultivo}/>
            </div>
            <div className="authed-form-div-select">
                <EspeciesDropdown nameForm={'especie'} 
                defaultValue={{value: props.bonsai.especie.id,
                label: `${props.bonsai.especie.nombrecomun} (${props.bonsai.especie.nombrecientifico})`}}/>
            </div>
            <div className="authed-form-div-select">
                <TipoFormaDropdown nameForm={'tipoforma'} 
                defaultValue={{value: props.bonsai.tipoForm.id,
                    label: `${props.bonsai.tipoForm.nombre} (${props.bonsai.tipoForm.descripcion})`}}/>
            </div>
            
            <button className='commonButton authed-form-button'
            >Actualizar</button>
        </form>
        <GoBackFixedButtonComponent goBackAction={props.setUpdating} value={false}/>
    </div>)
}