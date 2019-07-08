import React, {useState, useEffect} from 'react'
import { confirmAlert } from 'react-confirm-alert'
import axios from 'axios'

import '../CustomModalStyles.css'

export default function HistorialFotosComponent(props){

    const [imagesUrls, setImagesUrls] = useState([])
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)

    const [uploadingImage, setUploadingImagen] = useState(false)
    const [control, setControl] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [deletingImage, setDeletingImage] = useState(false)
    const [indexDeletingImage, setIndexDeletingImage] = useState(0)

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
    },[page, control])

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
        let reference, url
        while (i<data.length){
            reference=data[i].imagen
            url = await props.firebase.storageRef.child(reference).getDownloadURL()
            aux.push({
                imagen: data[i].imagen,
                fechasubida: data[i].fechasubida,
                url
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

    const handlePost = (e) => {
        let file = e.target.imageupload.files[0]
        let reference = `images/${props.idpropietario}/${props.idbonsai}/${file.name}`
        setUploadingImagen(true)
        props.firebase.storageRef.root.child(reference).put(file)
        .then(snapshot => {
            let path=snapshot.metadata.fullPath
            axios.post('/add-imagen-bonsai',{
                idbonsai: props.idbonsai,
                path,
                fechasubida: new Date()
            })
            .then(res => {
                const { msg } = res.data
                alert(msg)
                setControl(!control)
                setUploadingImagen(false)
            })
            .catch(err => {
                throw err
            })
        })
    }

    const handleDelete = (imagen, index) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                    <h1>Confirmar eliminación</h1>
                    <p>{`¿Estás seguro que quieres eliminar esta imagen? (Esta acción es permanente)`}</p>
                    <div className="custom-ui-buttons">
                        <button onClick={onClose}>¡¡NO!!</button>
                        <button
                            onClick={() => {
                                setDeletingImage(true)
                                setIndexDeletingImage(index+1)
                                axios.post('/delete-bonsai-image',{
                                    imagen,
                                    idbonsai: props.idbonsai
                                })
                                .then(res => {
                                    const { status, msg, imagen } = res.data
                                    if(status === 2){
                                        setControl(!control)
                                        props.firebase.storageRef.root.child(imagen).delete()
                                    }
                                    alert(msg)
                                    setDeletingImage(false)
                                    setIndexDeletingImage(0)
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

    return(
    <div>
        {
            fetching &&
            <div>
                <h1>Cargando Fotos...</h1>
            </div>
        }
        <div className="perfil-one-bonsai-historial-fotos">
            { !fetching &&
                imagesUrls.map((imagen, i) => 
                    {
                        return(<div key={i+1} className="perfil-one-bonsai-historial-item">
                            <img src={imagen.url} alt={`${imagen.fechasubida}`} height="120" width="120" />
                            {(!deletingImage && indexDeletingImage !== (i+1) &&
                            <button onClick={() => {
                                handleDelete(imagen.imagen, i)
                            }}>&#215;</button>)||
                            (deletingImage && indexDeletingImage === (i+1) &&
                            <h2>Eliminando...</h2>)}
                        </div>)
                    }
                )
            }
        </div>
        {
            imagesUrls.length === 0 && !fetching &&
            <div>
                <h1>No hay Imagenes</h1>
            </div>
        }
        {!fetching &&
        <div className="perfil-one-bonsai-historial-botones">
            <h5>Pagina: {page+1} / {pages}</h5>
            <button className="previous round pretty-button" onClick={() => { handlePreviousPage() }}>&#8249;</button>
            <button className="next round pretty-button" onClick={() => { handleNextPage() }}>&#8250;</button>
        </div>}
        {
            (!uploadingImage &&
            <div className="perfil-one-bonsai-historial-subir-form">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handlePost(e)
                }}>
                    <input type='file' name='imageupload' required accept='image/*'/>
                    <button className="commonButton">
                        Agregar Imagen
                    </button>
                </form>
                
            </div>)
            ||
            (uploadingImage &&
            <div className="perfil-one-bonsai-historial-subir-form">
                <h4>Cargando Imagen...</h4>
            </div>    
            )
        }
    </div>)

}