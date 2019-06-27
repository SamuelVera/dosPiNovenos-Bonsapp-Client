import React, { useState, useEffect } from 'react'
import PdfViewer from '../../PdfViewer/PdfwViewer'
import UpdateGuiaComponent from './UpdateGuiaComponent'
import CometariosComponent from './ComentariosComponent'
import VerResenasComponent from './VerResenasComponent'
import axios from 'axios'
import GoBackFixedButtonComponent from '../GoBackFixedButtonComponent'

import './GestionarUnaGuiaStyles.css'

export default function GestionarUnaGuia(props){

    const [fetching, setFetching] = useState(true)
    const [fetchingPDF, setFetchingPDF] = useState(true)
    const [loadingPDF, setLoadingPDF] = useState(false)

    const [guia, setGuia] = useState({})
    const [pdfLink, setPdfLink] = useState('')
    
    const [visitasMesAnterior, setVisitasMesAnterior] = useState(0)
    const [valoracionPromedio, setValoracionPromedio] = useState(0)

    const [verComentarios, setVerComentarios] = useState(false)
    const [verResenasPositivas, setVerResenasPositivas] = useState(false)
    const [verResenasNegativas, setVerResenasNegativas] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [control, setControl] = useState(true)

    useEffect(() => {
        let isSub = true

        axios.post('/fetch-guia-estadisticas',{
            id: props.idGuia,
            idusuario: props.user.id
        })
        .then(res => {
            if(isSub){
            const { status, data } = res.data
                if(status === 2){
                    setGuia(data)
                    setFetching(false)
                    let ref = data.pdfPath
                    props.firebase.storageRef.root.child(ref).getDownloadURL()
                    .then(url => {
                        setPdfLink(url)
                        setFetchingPDF(false)
                    })
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

    useEffect(() => {
        let isSub = true

        axios.post('/fetch-valoracion-prom-guia',{
            idguia: props.idGuia
        })
        .then(res => {
            if(isSub){
                const { status, data } = res.data
                if(status === 2){
                    setValoracionPromedio(parseFloat(data))
                }else{
                    alert(data)
                }
            }
        })
        .catch(err => {
            throw err
        })

        axios.post('/fetch-visitas-mes-anterior',{
            idguia: props.idGuia,
        })
        .then(res => {
            if(isSub) {   
                const { status, data } = res.data
                if(status === 2){
                    setVisitasMesAnterior(data)
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

    const handleSubmit = (e) =>  {
        axios.post('/update-guia',{
            id: guia.id,
            idusuario: props.user.id,
            guia: e
        })
        .then(res => {
            const { status, msg } = res.data
            if(status === 2){
                setControl(!control)
                setUpdating(false)
            } 
            alert(msg)
        })
        .catch(err => {
            throw err
        })
    }

    const handlePdfChange = (e) => {
        let file = e.target.upload.files[0]
        if(!(file.type === "application/pdf")){
            alert('Solo se permiten archivos .pdf')
        }else{
            let reference = `pdfs/${props.user.id}/${guia.nombre}/${file.name}`
            setLoadingPDF(true)
            props.firebase.storageRef.root.child(reference).put(file)
            .then((snapshot) => {
                let pdfpath = snapshot.metadata.fullPath
                setFetchingPDF(true)
                axios.post('/update-pdf-guia', {
                    id: guia.id,
                    idusuario: props.user.id,
                    pdfpath
                })
                .then(response => {
                    const {status, msg, pdfPath} = response.data
                    alert(msg)
                    if(status===2){
                        let ref = pdfPath
                        props.firebase.storageRef.root.child(ref).getDownloadURL()
                        .then(url => {
                            setPdfLink(url)
                            setFetchingPDF(false)
                        })
                    }
                    setLoadingPDF(false)
                })
                .catch(err => {
                    setLoadingPDF(false)
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

    return(<div className="gestion-guia">
            {(!updating && <div>
                {
                    (fetching &&
                    <div className="gestion-guia-container-info">
                        <h1>CARGANDO...</h1>
                    </div>)
                    ||
                    (!fetching &&
                    <div className="gestion-guia-container-info">
                        <div className="gestion-guia-container-info-1">
                            <h3>Nombre: {guia.nombre}</h3>
                            <h3>Idioma: {guia.idioma.nombre}</h3>
                            <button onClick={() => {
                                setUpdating(true)
                            }} className="commonButton" type='submit'>Actualizar Guia</button>
                        </div>
                        <div className="gestion-guia-container-info-2">
                            {guia.categorias.map((row, index) => 
                                <h3 key={index+1}>{row.nombre}</h3>)}
                        </div>
                        <div className="gestion-guia-container-info-3">
                            <h3>Cantidad Total de Visitas: {guia.visitas}</h3>
                            <h3>Valoración Promedio: {valoracionPromedio}</h3>
                            <h3>Visitas del mes anterior: {visitasMesAnterior}</h3>
                        </div>
                    </div>)
                }
                <div className="gestion-guia-opinion">
                {
                    (!verResenasPositivas && 
                    <button className="commonButton show" onClick={() => {
                        setVerResenasPositivas(!verResenasPositivas)
                    }}>Ver resenas positivas</button>)
                    ||
                    (verResenasPositivas &&
                    <div className="gestion-guia-opinion-positivas">
                        <VerResenasComponent idGuia={props.idGuia} criterio={1} qtty={10}/>
                        <button className="commonButton" onClick={() => {
                            setVerResenasPositivas(!verResenasPositivas)
                        }}>Ocultar resenas positivas</button>
                    </div>)
                }
                {
                    (!verResenasNegativas && 
                    <button className="commonButton show" onClick={() => {
                        setVerResenasNegativas(!verResenasNegativas)
                    }}>Ver resenas negativas</button>)
                    ||
                    (verResenasNegativas &&
                    <div className="gestion-guia-opinion-negativas">
                        <VerResenasComponent idGuia={props.idGuia} criterio={0} qtty={10}/>
                        <button className="commonButton" onClick={() => {
                        setVerResenasNegativas(!verResenasNegativas)
                        }}>Ocultar resenas negativas</button>
                    </div>)
                }
                {
                    (!verComentarios &&
                    <button className="commonButton show" onClick={() => {
                        setVerComentarios(!verComentarios)
                    }}>Ver Comentarios</button>)
                    ||
                    (verComentarios &&
                    <div className="gestion-guia-opinion-comentarios">
                        <CometariosComponent class={"gestion-comments-container"} idGuia={props.idGuia}/>
                        <button className="commonButton" onClick={() => {
                            setVerComentarios(!verComentarios)
                        }}>Ocultar Comentarios</button>
                    </div>)
                }
                </div>
                {
                    (!verResenasPositivas && !verResenasNegativas && !fetchingPDF && !verComentarios 
                        && !loadingPDF &&
                    <div className="gestion-guia-pdfcontainer">
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            handlePdfChange(e)
                        }}>
                            <div className="input-fileuploader">
                            <input
                                type='file' name='upload' required accept="application/pdf"/>
                            </div>
                            <button className="commonButton">Cambiar pdf</button>
                        </form>
                        <PdfViewer className="pdf-viewer" file={pdfLink}/>
                    </div>)
                    || (!verResenasPositivas && !verResenasNegativas && !fetchingPDF && !verComentarios 
                        && loadingPDF &&
                    <div className="gestion-guia-pdfcontainer">
                        <h1>Cargando archivo...</h1>
                    </div>
                    )
                }
            </div>)||
            (updating && 
            <UpdateGuiaComponent handleSubmit={handleSubmit} guia={guia} setUpdating={setUpdating}/>)}
            {!updating && 
            <GoBackFixedButtonComponent goBackAction={props.setShowingMany} value={true}/>
            }
        </div>
    )
}