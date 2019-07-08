import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './ComentariosStyles.css'

export default function ComentarioComponent(props){

    const [page, setPage] = useState(0)
    const [fetching, setfetching] = useState(true)
    const [comentarios, setComentarios] = useState([])
    const [pages, setPages] = useState(0)

    useEffect(() => {
        let isSub = true
        setfetching(true)
        axios.post('/fetch-guia-comentarios',{
            idguia: props.idGuia,
            page
        })
        .then(res => {
            if(isSub){
                const { status, data } = res.data
                if(status === 2){
                    setComentarios(data)
                    setfetching(false)
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
    },[page, props.controlComentarios])

    useEffect(() => {
        let isSub = true
        axios.post('/fetch-guia-comentarios-pag',{
            idguia: props.idGuia
        })
        .then(res => {
            if(isSub){
                const { status, pages } = res.data
                if(status === 2){
                    setPages(Math.ceil(pages))
                }
            }
        })
        .catch(err => {
            throw err
        })
        return () => isSub = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handlePrevious = () => {
        if(page !== 0){
            setPage(page-1)
        }
    }

    const handleNext = () => {
        if(comentarios.length === 10){
            setPage(page+1)
        }
    }

    return(<div className={props.class}>
        {
            fetching &&
            <h1>Cargando comentarios...</h1>
        }
        {
            !fetching && comentarios.length === 0 &&
            <h1>No hay comentarios</h1>
        }
        <div className="comentarios-items">
            {
                comentarios.map((row, index)=> 
                    <div className="comentarios-item" key={index+1}>
                        <div className="comentarios-item-encabezado"> {/* Encabezado del comentario */}
                            <h4>{row.usuario.nombre} ({row.usuario.correo}):</h4>
                        </div>
                        <div className="comentarios-item-content"> {/* Contenido del comentario */}
                            <h4>{row.contenido}</h4>
                        </div>
                        <div className="comentarios-item-pie"> { /* Pie del comentario */}
                            <h5>{row.fechapublicacion}</h5>
                        </div>
                    </div>
                )
            }
        </div>
        {!fetching && comentarios.length !== 0 && 
        <div className="comentarios-buttons"> {/* Botones de avanzar página o devolver página */}
            <h4>Pag. {page+1} / {pages}</h4>
            <button className="pretty-button previous" onClick={() => {
                handlePrevious()
            }}>&#8249;</button>
            <button className="pretty-button next" onClick={() => {
                handleNext()
            }}>&#8250;</button>
        </div>}
    </div>)
}