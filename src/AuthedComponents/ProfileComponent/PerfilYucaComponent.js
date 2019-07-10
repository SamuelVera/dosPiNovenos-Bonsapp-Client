import React, { useState, useEffect } from 'react'
import UpdateUserDatosComponent from './UpdateUserDatosComponent'
import ManyBonsaisComponent from './ManyBonsaisComponent'
import OneBonsaiComponent from './OneBonsaiComponent'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import axios from 'axios'

import '../GuiasComponent/FixedButtonsStyles.css'
import './PerfilYucaComponentStyles.css'
import '../CustomModalStyles.css'

export default function PerfiYucaComponent(props){
 
    const [bonsais, setBonsais] = useState([])
    const [imagenes, setImagenes] = useState([])
    const [user, setUser] = useState({})

    const [idBonsaiViendo,setIdBonsaiViendo] = useState(0)
    const [bonsaiViendo, setBonsaiViendo] = useState({
        especie: {},
        tipoForm: {},
        tipoTam: {},
        fechacultivo: new Date(),
        fechaagregado: new Date(),
    })
    
    const [rango, setRango] = useState('')
    const [rangoId, setRangoId] = useState(0)
    const [reputacion, setReputacion] = useState(0)

    const [pais, setPais] = useState('')

    const [fetching, setFetching] = useState(true)
    const [control, setControl] = useState(true)
    const [controlOne, setControlOne] = useState(true)
    const [controlPais, setControlPais] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [viendoUno, setViendoUno] = useState(false)
    const [comprobandoAscenso, setComprobandoAscenso] = useState(false)
    const [deletingBonsai, setDeletingBonsai] = useState(false)
    const [idBonsaiDeleting, setIdBonsaiDeleting] = useState(0)
    const [uploadingUser, setUploadingUser] = useState(false)

    useEffect(() => {
        if(!viendoUno){
            setIdBonsaiViendo(0)
        }
    },[viendoUno])

    useEffect(() => {
        let isSub = true
        if(!navigator.onLine){
            setFetching(true)
            setBonsais(JSON.parse(localStorage.getItem('userBonsais')))
            setFetching(false)
        }else{
            setFetching(true)
            axios.post('/fetch-bonsais-user',{iduser: props.user.id})
            .then(res => {
                if(isSub){
                    const {status, data} = res.data
                    if(status === 2 ){
                        handleImages(data)
                        setBonsais(data)
                        localStorage.setItem('userBonsais',JSON.stringify(data))
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

        if(!navigator.onLine){
            setReputacion(localStorage.getItem('userRepu'))
        }else{
            axios.post('/fetch-reputacion-user',{idpropietario: props.user.id})
            .then(res => {
                if(isSub){
                    const { status, data } = res.data
                    if(status === 2){
                        setReputacion(data)
                        localStorage.setItem('userRepu',data)
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

    useEffect(() => {
        let isSub = true
        if(!navigator.onLine){
            setRango(localStorage.getItem('userRango'))
            setUser(JSON.parse(localStorage.getItem('user')))
        }else{
            setUser(props.user)
            localStorage.setItem('user', JSON.stringify(props.user))
            axios.post('/fetch-rango',{
                idusuario: props.user.id
            })
            .then(res => {
                if(isSub){
                    const { status, data } = res.data
                    if(status === 2){
                        setRango(data.nombre)
                        localStorage.setItem('userRango',data.nombre)
                        setRangoId(data.id)
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
    },[])

    useEffect(() =>{
        let isSub = true
        if(!navigator.onLine){
            setPais(localStorage.getItem('userPais'))
        }else{
            axios.post('/fetch-pais-user',{
                id: props.user.id
            })
            .then(res => {
                if(isSub){
                    const { status, data } = res.data
                    if(status === 2){
                        setPais(data)
                        localStorage.setItem('userPais', data)
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
    },[controlPais])

    useEffect(() => {
        let isSub = true
        if(idBonsaiViendo !== 0){
            setViendoUno(true)
            axios.post('/fetch-one-user-bonsai',{
                iduser: props.user.id,
                idbonsai: idBonsaiViendo
            })
            .then(res => {
                if(isSub){
                    const {status, data} = res.data
                    if(status === 2){
                        setBonsaiViendo(data)
                        setViendoUno(true)
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
    },[idBonsaiViendo, controlOne])

    const handleImages = async (data) => {
        let i = 0
        let aux = []
        let reference, url
        while (i<data.length){
            if(data[i].latestpic){
                reference = data[i].latestpic
                url = await props.firebase.storageRef.child(reference).getDownloadURL()
                aux.push(url)
            }else{
                aux.push(null)
            }
            i++
        }
        setImagenes(aux)
    }

    const handleEliminar = (id, apodo)=>{
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                    <h1>Confirmar eliminación</h1>
                    <p>{`¿Estás seguro que quieres eliminar el "bonsai ${apodo}"? (Esta acción es permanente)`}</p>
                    <div className="custom-ui-buttons">
                        <button onClick={onClose}>¡¡NO!!</button>
                        <button
                            onClick={() => {
                                setDeletingBonsai(true)
                                setIdBonsaiDeleting(id)
                                axios.post('/delete-one-bonsai',{
                                    idbonsai: id,
                                    iduser: props.user.id
                                })
                                .then(res => {
                                    alert(res.data.msg)
                                    setControl(!control)
                                    setIdBonsaiDeleting(0)
                                    setDeletingBonsai(false)
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

    const handleAscenso = () => {
        setComprobandoAscenso(true)
        axios.post('/check-ascender-rango',{
            rangoActual: rangoId,
            reputacion,
            idusuario: props.user.id
        })
        .then(res => {
            const { status, msg, data } = res.data
            alert(msg)
            if(status === 2){
                setRangoId(data.id)
                setRango(data.nombre)
            }
            setComprobandoAscenso(false)
        })
        .catch(err => {
            throw err
        })
    }

    const handleUserUpdate = (user) => {
        setUploadingUser(true)
        axios.post('/update-user',{
            id: props.user.id,
            user
        })
        .then(res => {
            const { status, msg, user } = res.data
            alert(msg)
            if(status === 2){
                let aux = props.user
                aux.nombre = user.nombre
                aux.direccion = user.direccion
                setUpdating(false)
                setControlPais(!controlPais)
                setUser(aux)
                localStorage.setItem('user', aux)
            }
            setUploadingUser(false)
        })
    }

    return(<div>
        {(!updating &&
            <div>
                {
                    (!viendoUno &&
                    <div className="perfil-muchos-bonsais">
                        <div className="perfil-muchos-bonsais-encabezado">
                            <div className="perfil-muchos-bonsais-encabezado-info-f">
                                <h2>{user.id}</h2>
                                <h2>{user.nombre}</h2>
                                <button className='commonButton' onClick={() => {
                                    setUpdating(true)
                                }}>Actualizar Datos</button>
                            </div>
                            <div className="perfil-muchos-bonsais-encabezado-info-s">
                                <h2>Correo: {user.correo}</h2>
                                <h2>Direccion: {user.direccion}</h2>
                                <h2>Pais: {pais}</h2>
                            </div>
                            <div className="perfil-muchos-bonsais-encabezado-rango">
                                <h2>Rango: {!comprobandoAscenso && rango}</h2>
                                <h2>Reputacion: {reputacion}</h2>
                                {rangoId !== 0 && !comprobandoAscenso && rangoId !== 3 &&
                                <button className='commonButton' onClick={() => {
                                    handleAscenso()
                                }}>Ascender de rango!</button>}
                                {
                                    rangoId === 3 &&
                                    <h2>Tienes el Rango Maximo!</h2>
                                }
                                {
                                    comprobandoAscenso && rangoId !== 3 &&
                                    <h2>Comprobando Ascenso...</h2>
                                }
                            </div>
                        </div>
                        { !fetching && <ManyBonsaisComponent 
                        handleEliminar={handleEliminar} imagenes={imagenes}
                        setIdBonsaiViendo={setIdBonsaiViendo} bonsais={bonsais}
                        deletingBonsai={deletingBonsai} idBonsaiDeleting={idBonsaiDeleting}/>}
                        <div>
                            <button className='fixedBottomRightButton fixedBottomAdd' 
                                onClick={() => 
                                    props.setBonsaiForm(true)}>
                                    <i className="fa fa-plus float">+</i>
                            </button>
                            <div className="label-container">
                                <div className="label-text">Agregar Bonsai</div>
                                    <i className="fa fa-play label-arrow"></i>
                            </div>
                        </div>
                    </div>)
                    ||
                    (viendoUno && 
                    <OneBonsaiComponent control={controlOne} setControl={setControlOne}
                    setViendoUno={setViendoUno} bonsai={bonsaiViendo} idbonsai={idBonsaiViendo}
                    setIdBonsaiViendo={setIdBonsaiViendo}/>)
                }
                {
                    fetching &&
                    <div>
                        <h1>Cargando Bonsais...</h1>
                    </div>
                }
            </div>)
            ||(updating && <UpdateUserDatosComponent user={props.user} handleUserUpdate={handleUserUpdate}
            pais={pais} setUpdating={setUpdating} uploadingUser={uploadingUser}/>)
        }
    </div>)
}
