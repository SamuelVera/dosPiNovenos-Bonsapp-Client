import React from 'react'
import IdiomaDropdown from '../../Dropdowns/IdiomasDropdown'
import CategoriasDropdown from '../../Dropdowns/CategoriasDropdown'
import GoBackFixedButtonComponent from '../GoBackFixedButtonComponent'
import axios from 'axios'

import '../AuthedFormStyles.css'

/**
 * Validación de campos hecha con parámetros de html
 */
export default function AgregarGuiaComponent(props) {
    
    const handleSubmit = e => {
        let file = e.target.upload.files[0]
        if(!e.target.categorias.value && !e.target.categorias.length){
            alert('Elige una o varias categorias para la guia')
        }
        else if(!e.target.ididioma){
            alert('Seleccione un idioma para la guia')
        }
        else if(!(file.type === "application/pdf")){
            alert('Solo se permiten archivos .pdf')
        }
        else{
            let guia = {
                nombre: e.target.nombre.value,
                fechapublicacion: new Date(),
                idusuario: props.user.id,
                ididioma: e.target.ididioma.value,
                pdfpath: '',
                categorias: null
            }

            if(!!e.target.categorias.value){
                guia.categorias = e.target.categorias.value
            }else{
                let aux = []
                e.target.categorias.forEach(element => {
                    aux=[...aux, element.value]
                })
                guia.categorias = aux
            }

            props.setUploadingPdf(true)

            let reference = `pdfs/${guia.idusuario}/${guia.nombre}/${file.name}`
            props.firebase.storageRef.root.child(reference).put(file)
            .then((snapshot) => {
                alert('Subida de archivo pdf exitosa')
                guia.pdfpath = snapshot.metadata.fullPath
                props.setUploadingPdf(false)
                props.setUploadingGuia(true)
                axios.post('/add-guia', guia)
                .then(response => {
                    const {status, msg} = response.data
                    alert(msg)
                    if(status===2){
                        props.setAddGuia(false)
                        props.setControl(!props.control)
                    }
                    props.setUploadingGuia(false)
                })
                .catch(err => {
                    throw err
                })
            })
            .catch(error => {
                switch (error.code) {
                    case 'storage/object-not-found':
                    alert('El archivo no existe')
                        break;
                    case 'storage/unauthorized':
                    alert('Acceso denegado')
                        break;
                    case 'storage/canceled':
                        alert('Descarga cancelada')
                        break;
                    case 'storage/unknown':
                        alert('Error en la descarga')
                        break;
                    default:
                        alert('Error desconocido')
                        break;
                }
            })
        }
    }

    return(
        <div className='authed-form-div-ext'>
            {
                props.uploadingGuia &&
                <div className="uploading-guia-text">
                    <h3>Subiendo Guia...</h3>
                </div>
            }
            <form className='authed-form' onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(e)
            }}>
                <div className='authed-form-div'>
                    <label className='authed-form-label'>Nombre de la Guia</label>
                    <input className='authed-form-input' placeholder='Nombre de la guia' type='text' name='nombre' required />
                </div>
                {
                    (!props.uploadingPdf &&
                    <div className="authed-form-div">
                        <label className='authed-form-label'>Archivo PDF</label>
                        <input className='authed-form-input'
                        type='file' name='upload' required accept="application/pdf"/>
                    </div>)||
                    (props.uploadingPdf && 
                    <div className="authen-form-div">
                        <h3>Subiendo Pdf...</h3>
                    </div>)
                }
                <div className="authed-form-div-select">
                    <CategoriasDropdown defaultValue={null} nameForm='categorias'/>
                </div>
                <div className="authed-form-div-select">
                    <IdiomaDropdown defaultValue={null} nameForm='ididioma'/>
                </div>
                {!props.uploadingGuia &&
                    <button className='commonButton authed-form-button' type='submit'>Agregar Guía</button>
                }
            </form>
            <GoBackFixedButtonComponent goBackAction={props.setAddGuia} value={false}/>
        </div>
    )

}