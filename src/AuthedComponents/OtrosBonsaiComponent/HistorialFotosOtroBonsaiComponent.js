import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function HistorialFotosOtrosBonsaiComponent(props){

    const [imagesUrls, setImagesUrls] = useState([])
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        let isSub = true
        setFetching(true)
        axios.post('/fetch-images-bonsai',{
            idbonsai: props.idbonsai,
            page
        })
        .then(res => {
            if(isSub){
                const { status, data } = res.data
                if(status === 2){
                    handleIncomingImages(data)
                    setFetching(false)
                }else{
                    alert(data)
                }
            }
        })
        .catch(err => {
            throw err
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page])

    useEffect(() => {
        let isSub = true
        axios.post('/fetch-images-bonsai-pag',{
            idbonsai: props.idbonsai
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

    const handleIncomingImages = async (data) => {
        let i = 0
        let aux = []
        let reference, imagen 
        while (i<data.length){
            reference=data[i].imagen
            imagen = await props.firebase.storageRef.child(reference).getDownloadURL()
            aux.push({
                imagen,
                fechasubida: data[i].fechasubida
            })
            i++
        }
        setImagesUrls(aux)
    }

    const handleNextPage = () => {
        if(imagesUrls.length === 5){
            setPage(page+1)
        }
    }

    const handlePreviousPage = () => {
        if(page!==0){
            setPage(page-1)
        }
    }

    return(<div className="historial-container">
        {
            fetching && 
            <div>
                <h1>Cargando Imagenes...</h1>
            </div>
        }
        <div className="historial-items">
        { !fetching &&
            imagesUrls.map((imagen, i) => 
                <div className="historial-item" key={i+1}>
                    <img className="image" src={imagen.imagen} alt={`${imagen.fechasubida}`} height="80" width="80" />
                </div>)
        }
        </div>
        {
            imagesUrls.length === 0 && !fetching &&
            <div>
                <h1>No hay Imagenes</h1>
            </div>
        }
        {!fetching && 
        <div className="historial-buttons">
            <button className="previous pretty-button round" onClick={() => { handlePreviousPage() }}>&#8249;</button>
            <button className="next pretty-button round" onClick={() => { handleNextPage() }}>&#8250;</button>
            <h5>Pagina: {page+1} / {pages}</h5>
        </div>}
    </div>)
}