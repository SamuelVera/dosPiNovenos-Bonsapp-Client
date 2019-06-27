import React from 'react'
import EspeciesDropdown from '../../Dropdowns/EspeciesDropdow'
import TipoFormaDropdown from '../../Dropdowns/TipoFormaDropdown'
import GoBackFixedButtonComponent from '../GoBackFixedButtonComponent'

import '../AuthedFormStyles.css'

function AddBonsai(props){
    
    const handleSubmit = (e) => {
        if(!e.target.especie){
            alert('Elige la especie de tu bonsai')
        }else if(!e.target.tipoforma){
            alert('Elige el tipo de forma de tu bonsai')
        }else{
            props.addBonsai({
                apodo: e.target.apodo.value,
                especie: e.target.especie.value,
                tipoforma: e.target.tipoforma.value,
                tamano: e.target.tamano.value,
                fechacultivo: e.target.fechacultivo.value,
            })
        }
    }

    return(
        <div className='authed-form-div-ext'>
        <form className='authed-form' 
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(e)
        }}>
            <div className="authed-form-div">
                <label className='authed-form-label'>Apodo o nickname </label>
                <input className='authed-form-input'
                type='text' name='apodo' placeholder='Ingresa un Apodo'
                minLength={0} maxLength={20}/>
            </div>
            <div className='authed-form-div'>
                <label className='authed-form-label'>Tamaño (cm)</label>
                <input className='authed-form-input'
                type='number' name='tamano' placeholder='Ingresa el tamaño del bonsai' 
                requiredtxt='CAMPO VACIO!' min={0} max={500} required/>
            </div>
            <div className='authed-form-div'>
                <label className='authed-form-label'>Fecha de Cultivo</label>
                <input className='authed-form-input'
                type='date' name='fechacultivo' placeholder='Ingresa la edad del bonsai' required
                requiredtxt='CAMPO VACIO!'/>
            </div>
            <div className='authed-form-div'>
                <div className='authed-form-div-select'>
                    <EspeciesDropdown defaultValue={null} nameForm={'especie'} />
                </div>
            </div>
            <div className='authed-form-div'>
                <div className='authed-form-div-select'>
                    <TipoFormaDropdown defaultValue={
                        null
                    } nameForm={'tipoforma'} />
                </div>
            </div>
            <button className='commonButton special'
            >Agregar</button>
        </form>
        <GoBackFixedButtonComponent goBackAction={props.setBonsaiForm} value={false}/>
    </div>
    )
}

export default AddBonsai