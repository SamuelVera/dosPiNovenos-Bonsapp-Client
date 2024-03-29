import React, { useState, useEffect } from 'react'
import PdfViewer from '../../PdfViewer/PdfwViewer'
import AgregarComentarioComponent from './AgregarComentarioComponent'
import ComentariosComponent from './ComentariosComponent'
import AgregarResenaComponent from './AgregarResenaComponent'
import VerResenasComponent from './VerResenasComponent'
import GoBackFixedButtonComponent from '../GoBackFixedButtonComponent'
import axios from 'axios'

import './MostrarUnaGuiaStyles.css'

function MostrarUnaGuia(props){

    const [guia, setGuia] = useState({})
    const [pdfLink, setPdfLink] = useState('')
    const [resenaTitle, setResenaTitle] = useState('')
    const [resenaStatus, setResenaStatus] = useState(0)
    const [resena, setResena] = useState({})
    const [valoracion, setValoracion] = useState(0)

    const [fetchingPDF, setFetchingPDF] = useState(true)
    const [fetchingGuia, setFetchingGuia] = useState(true)
    const [control, setControl] = useState(false)
    const [controlComentarios, setControlComentarios] = useState(false)
    const [uploadingComentario, setUploadingComentario] = useState(false)
    const [uploadingResena, setUploadingResena] = useState(false)

    useEffect(() => {
        let isSub = true
            //Traer la guía
        axios.post('/fetch-one-guia',{
            id: props.idGuia,
            idUsuarioVisitante: props.user.id
        })
        .then(res => {
            if(isSub){
                const { status, data } = res.data
                if(status === 2){
                    setGuia(data)
                    let ref = data.pdfPath
                    props.firebase.storageRef.root.child(ref).getDownloadURL()
                    .then(url => {
                        if(isSub){
                            setPdfLink(url)
                            setFetchingPDF(false)
                        }
                    })
                    setFetchingGuia(false)
                }else{
                    alert(data)
                }
            }
        })
        .catch(err => {
            throw err
        })
        return () => isSub = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        let isSub = true
            //Verificar si ya la ha resenado
        axios.post('/is-resenada',{
            idguia: props.idGuia,
            idusuario: props.user.id
        })
        .then(res => {
            if(isSub){
                const { status, title, resena } = res.data
                setResena(resena)
                if(status === 2){ //Ya la ha reseñado antes
                    setResenaTitle(title)
                    setResenaStatus(status)
                    setResena(resena)
                }else if(status === 3){ //Jamás la ha reseñado
                    setResenaTitle(title)
                    setResenaStatus(status)
                }
            }
        })
        .catch(err => {
            throw err
        })
        //Traer la reputacion
        axios.post('/fetch-valoracion-prom-guia',{
            idguia: props.idGuia
        })
        .then(res => {
            if(isSub){
                const { status, data } = res.data
                if(status === 2){
                    setValoracion(parseFloat(data))
                }else{
                    alert(data)
                }
            }
        })
        .catch(err => {
            throw err
        })
        return () => isSub = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[control])

    return(
        <div className="container">
            <div className="guia-container">
                { //Encabezado con información de la guía
                    (fetchingGuia && 
                        <div className='guia-container-info'>
                            <h4>Cargando ...</h4>
                        </div>)
                    ||
                    (!fetchingGuia &&
                    <div className='guia-container-info'>
                        <div className="guia-container-info-1">
                            <h1>{guia.nombre}</h1>
                            <h1>Fecha de Publicacion: {guia.fechaPublicacion.toLocaleString()}</h1>
                            <h1>Idioma: {guia.idioma}</h1>
                        </div>
                        <div className="guia-container-info-2">
                            {
                                guia.categorias.map(element => 
                                    <h1 key={element.id}>{element.nombre}</h1>    
                                )
                            }
                        </div>
                        <div className="guia-container-info-3">
                            <h1>Creador: {guia.usuario.nombre}</h1>
                            <h1>Correo: {guia.usuario.correo}</h1>
                        </div>
                        <div className="guia-container-info-4">
                            <h1>Valoracion: {valoracion}</h1>
                            <h1>Visitas: {guia.visitas}</h1>
                        </div>
                    </div>)
                }
            </div>
            <div className="pdf-container">
                { //Sección del PDF
                    (fetchingPDF && 
                    <div className="pdf-container-file">
                        <h4>Cargando PDF...</h4>
                    </div>)
                    ||(!fetchingPDF &&
                    <div className="pdf-container-file">
                        <PdfViewer className="pdf-viewer" file={pdfLink}/>
                    </div>)
                }
                <div className='guia-container-resenas'>
                    <div className='guia-container-resenas-1'>
                        <h2>Resenas:</h2>
                    </div>
                    <div className='guia-container-resenas-2'>
                        <VerResenasComponent idGuia={props.idGuia} criterio={1} qtty={3} 
                        control={control}/>
                        <AgregarResenaComponent status={resenaStatus} title={resenaTitle}
                        idGuia={props.idGuia} idusuario={props.user.id} resena={resena}
                        control={control} setControl={setControl} uploadingResena={uploadingResena}
                        setUploadingResena={setUploadingResena}/>
                    </div>
                </div>
            </div>
            <div className="one-comments-container"> {/* Sección de Comentarios */}
                <div className="comments-container-1">
                    <h2>Comentarios:</h2>
                </div>
                <div className="comments-container-2">
                    <ComentariosComponent class={"a"} idGuia={props.idGuia} controlComentarios={controlComentarios}/>
                    <AgregarComentarioComponent setControlComentarios={setControlComentarios}
                    controlComentarios={controlComentarios} idGuia={props.idGuia} idusuario={props.user.id}
                    uploadingComentario={uploadingComentario} setUploadingComentario={setUploadingComentario}/>
                </div>
            </div>
            <GoBackFixedButtonComponent goBackAction={props.setShowingMany} value={true}/>
        </div>
    )
}

export default MostrarUnaGuia