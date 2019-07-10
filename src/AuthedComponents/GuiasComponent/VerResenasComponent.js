import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './VerResenasStyles.css'

export default function VerResenasComponent(props){

    const [resenas, setResenas] = useState([])
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        let isSub =true
        setFetching(true)
        axios.post('/fetch-resenas-posi-o-nega',{
            page,
            idguia: props.idGuia,
            criterio: props.criterio,
            qtty: props.qtty
        })
        .then(res => {
            if(isSub){
                const { status, data } = res.data
                if(status === 2){
                    setResenas(data)
                    setFetching(false)
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
    },[page, props.control])

    useEffect(() => {
        let isSub = true
        axios.post('/fetch-resenas-pags',{
            idguia: props.idGuia,
            qtty: props.qtty
        })
        .then(res => {
            if(isSub){
                const {status, pages} = res.data
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
        if(resenas.length === props.qtty){
            setPage(page+1)
        }
    }

    return(<div>
        {
            (fetching && 
            <h1>Cargando Resenas...</h1>)
            ||
            (!fetching && resenas.length === 0 &&
            <h1>No hay resenas sobre esta guia</h1>)
            ||
            <div className="resenas">
                {(resenas.map((row, index) => {
                    
                    const dates = row.fechapublicacion.toLocaleString()
                    let [y, m, d, hh, mm, ss, ms] = dates.match(/\d+/g)
                    let date = new Date(Date.UTC(y, m - 1, d, hh, mm, ss, ms))
                    let formatted = date.toLocaleString()

                    return(<div className="resenas-item" key={index+1}>
                        <div className="resenas-item-head"> {/* Encabezado de la reseña */}
                            <h3>{row.usuario.nombre} ({row.usuario.correo}):</h3>
                            <h3>Ptos: {row.puntuacion}</h3>
                        </div>
                        <div className="resenas-item-body">{/* Cuerpo de la reseña */}
                            <h4>{row.opinion}</h4>
                        </div>
                        <div className="resenas-item-foot">{/* Piso de la reseña */}
                            <h5>{formatted}</h5>
                        </div>
                    </div>)}))}
                {
                (resenas.length !== 0 &&
                    <div className="resenas-buttons">  {/* Botones de avanzar página o devolver página */}
                        <h4>Pag. {page+1} / {pages}</h4>
                        <button className="previous round pretty-button" onClick={() => {
                            handlePrevious()
                        }}>&#8249;</button>
                        <button className="next round pretty-button" onClick={() => {
                            handleNext()
                        }}>&#8250;</button>
                    </div>)
                }
            </div>
        }
    </div>)
}