import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AgregarGuia from './AgregarGuiaComponent'
import { FirebaseContext } from '../../../Firebase/index'
import MostrarMuchasMisGuiasComponent from './MostrarMuchasMisGuiasComponent'
import GestionarUnaGuia from './GestionarUnaGuia'
import GoBackFixedButtonComponent from '../GoBackFixedButtonComponent'
import { confirmAlert } from 'react-confirm-alert'

import './DesplegarStyles.css'
import '../CustomModalStyles.css'

export default function MisGuiasComponent(props){

    const [misGuias, setMisGuias] = useState([])
    const [idMostrar, setIdMostrar] = useState(0)

    const [uploadingPdf, setUploadingPdf] = useState(false)
    const [uploadingGuia, setUploadingGuia] = useState(false)
    const [showingMany, setShowingMany] = useState(true)
    const [control, setControl] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [addGuia, setAddGuia] = useState(false)
    const [deletingGuia, setDeletingGuia] = useState(false)
    const [idDeletingGuia, setIdDeletingGuia] = useState(0)

    useEffect(() => {
        let isSub = true
        setFetching(true)
        if(!navigator.onLine){
            let guias = JSON.parse(localStorage.getItem('userGuias'))
            if(guias){
                setMisGuias(guias)
                setFetching(false)
            }
        }else{
            axios.post('/get-guias-from-user',{
                idusuario: props.user.id
            })
            .then(res => {
                if(isSub){
                    const { status, data } = res.data
                    if(status === 2){
                        setMisGuias(data)
                        localStorage.setItem('userGuias', JSON.stringify(data))
                        setFetching(false)
                    }else{
                        alert(data)
                    }
                }
            })
            .catch(err => {
                throw err
            })
        }
        
        return () => isSub = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[control])

    const handleRangoCheck = () => {
        axios.post('/fetch-rango',{
            idusuario: props.user.id
        })
        .then(res => {
            const { status, data } = res.data
            if(status === 2){
                if(data.id === 3){
                    setAddGuia(true)
                }else{
                    alert('No posees los privilegios del rango Hachi-Uye para agregar una guía')
                }
            }
        })
        .catch(err => {
            throw err
        })
    }

    const handleDelete = (id, guia, firebase) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                    <h1>Confirmar eliminación</h1>
                    <p>{`¿Estás seguro que quieres eliminar ${guia}? (Esta acción es permanente)`}</p>
                    <div className="custom-ui-buttons">
                        <button onClick={onClose}>¡¡NO!!</button>
                        <button
                            onClick={() => {
                                setDeletingGuia(true)
                                setIdDeletingGuia(id)
                                axios.post('/delete-guia',{
                                    idusuario: props.user.id,
                                    id
                                })
                                .then(res => {
                                    const { status, msg, reference } = res.data
                                    if(status === 2){
                                        firebase.storageRef.root.child(reference).delete()
                                        setControl(!control)
                                    }
                                    alert(msg)
                                    setDeletingGuia(false)
                                    setIdDeletingGuia(0)
                                })
                                .catch(err => {
                                    throw err
                                })
                                onClose();
                            }}
                        >
                        Si, estoy seguro!
                        </button>
                    </div>
                    </div>
                )
            }
        })
    }

    return(<div className="body">
        {
            fetching &&
            <div>
                <h1>Cargando Guias...</h1>
            </div>
        }
        {
            misGuias.length === 0 && !fetching &&
            <div>
                <h1>No hay guias</h1>
            </div>
        }
            {
                (addGuia &&
                <FirebaseContext.Consumer>
                    {
                        firebase => <AgregarGuia setAddGuia={setAddGuia} user={props.user} firebase={firebase}
                        control={control} setControl={setControl} uploadingGuia={uploadingGuia} 
                        setUploadingGuia={setUploadingGuia} uploadingPdf={uploadingPdf} setUploadingPdf={setUploadingPdf}
                        />
                    }
                </FirebaseContext.Consumer>
                ) ||
                (!addGuia && showingMany && !fetching &&
                <div>
                <FirebaseContext.Consumer>{
                    firebase => <MostrarMuchasMisGuiasComponent guias={misGuias} setIdMostrar={setIdMostrar}
                    setShowingMany={setShowingMany} handleDelete={handleDelete} firebase={firebase}
                    deletingGuia={deletingGuia} idDeletingGuia={idDeletingGuia}/>
                }</FirebaseContext.Consumer>
                    <div>
                        <button className='fixedBottomRightButton fixedBottomDeploy' 
                            onClick={() => handleRangoCheck()
                        }>
                            <i className="fa fa-plus float">+</i>
                        </button>
                        <div className="label-container-up">
                            <div className="label-text">Agregar Guía</div>
                            <i className="fa fa-play label-arrow"></i>
                        </div>
                    </div>
                </div>) ||
                (!addGuia && !showingMany &&
                    <FirebaseContext.Consumer>{
                        firebase => <GestionarUnaGuia 
                                        user={props.user} idGuia={idMostrar}
                                        setShowingMany={setShowingMany} firebase={firebase}/>
                        }</FirebaseContext.Consumer>)
            }
            {
                showingMany &&
                <GoBackFixedButtonComponent goBackAction={props.setViendoMias} value={false}/>
            }
    </div>)
}