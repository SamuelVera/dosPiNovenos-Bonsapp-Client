import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BonsaiOtroUsuarioComponent from './BonsaiOtroUsuarioComponent'
import BonsaisOtroUsuarioComponent from './BonsaisOtroUsuarioComponent'
import MostrarMuchasGuias from '../GuiasComponent/MostrarMuchasGuias'
import GuiaOtroUsuarioComponent from './GuiaOtroUsuarioComponent'
import GoBackFixedButtonComponent from '../GoBackFixedButtonComponent'

import './PerfilOtroUsuarioStyles.css'

export default function PerfilOtroUsuarioComponent(props){

    const [bonsais, setBonsais] = useState([])
    const [imagenes, setImagenes] = useState([])
    const [guias, setGuias] = useState([])
    
    const [fetchingBonsais, setFetchingBonsais] = useState(true)
    const [fetchingGuias, setFetchingGuias] = useState(true)

    const [rango, setRango] = useState('')
    const [reputacion, setReputacion] = useState(0)

    const [bonsaiViendo, setBonsaiViendo] = useState({})
    const [idBonsaiViendo,setIdBonsaiViendo] = useState(0)
    const [viendoUnBonsai, setViendoUnBonsai] = useState(false)

    const [idGuiaViendo,setIdGuiaViendo] = useState(0)
    const [viendoMuchasGuias, setViendoMuchasGuias] = useState(true)

    const [control, setControl] = useState(true)
    
    useEffect(() => {
        if(!viendoUnBonsai){
            setIdBonsaiViendo(0)
        }
    },[viendoUnBonsai])

    useEffect(() => {
        let isSub = true
        setFetchingBonsais(true)
        setFetchingGuias(true)
        axios.post('/fetch-bonsais-user',{
            iduser: props.usuario.id
        })
        .then(res => {
            if(isSub){
                const {status, data} = res.data
                if(status === 2 ){
                    handleImages(data)
                    setBonsais(data)
                    setFetchingBonsais(false)
                }else{
                    alert(data)
                }
            }
        })
        .catch(err => {
            throw err
        })

        axios.post('/fetch-rango',{
            idusuario: props.usuario.id
        })
        .then(res => {
            if(isSub){
                const { status, data } = res.data
                if(status === 2){
                    setRango(data.nombre)
                }else{
                    alert(data)
                }
            }
        })
        .catch(err => {
            throw err
        })

        axios.post('/get-guias-from-user',{
            idusuario: props.usuario.id
        })
        .then(res => {
            if(isSub){
                const { status, data } = res.data
                if(status === 2){
                    setGuias(data)
                    setFetchingGuias(false)
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
        axios.post('/fetch-reputacion-user',{
            idpropietario: props.usuario.id
        })
        .then(res => {
            if(isSub){
                const { status, data } = res.data
                if(status === 2){
                    setReputacion(data)
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
        if(idBonsaiViendo !== 0){
            axios.post('/fetch-one-user-bonsai',{
                iduser: props.usuario.id,
                idbonsai: idBonsaiViendo
            })
            .then(res => {
                if(isSub){
                    const {status, data} = res.data
                    if(status === 2){
                        setBonsaiViendo(data)
                        setViendoUnBonsai(true)
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
    },[idBonsaiViendo])

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

    return (
    <div className="cuerpo-perfil-otro-user">
        <div className="encabezado-perfil">
            <div className="info-perfil">
                <h2>Nombre: {props.usuario.nombre}</h2>
                <h2>Correo: {props.usuario.correo}</h2>
                <h2>Direccion: {props.usuario.direccion}</h2>
                <h2>Pais: {props.usuario.pais}</h2>
            </div>
            <div className="rango-perfil">
                <h2>Rango: {rango}</h2>
                <h2>Reputacion: {reputacion}</h2>
            </div>
        </div>
        <div className="cuerpo-perfil">
            {
                (!viendoUnBonsai && (
                    <div className="bonsais-otro-perfil">
                        <h2 className="bonsais-otro-perfil-h2">Bonsais</h2>
                        {(fetchingBonsais &&
                        <h2 className="bonsais-otro-perfil-h2">Cargando Bonsais....</h2>)
                        ||
                        (!fetchingBonsais && bonsais.length > 0 &&
                        <BonsaisOtroUsuarioComponent imagenes={imagenes} bonsais={bonsais}
                        setIdBonsaiViendo={setIdBonsaiViendo}/>)
                        ||
                        (!fetchingBonsais && bonsais.length === 0 &&
                        <h2 className="bonsais-otro-perfil-h2">No hay bonsais...</h2>)}
                    </div>
                ))
                ||
                (viendoUnBonsai &&
                    <div className="one-bonsai-otro-perfil"> 
                        <BonsaiOtroUsuarioComponent userid={props.user.id} bonsai={bonsaiViendo}
                        setBonsaiViendo={setBonsaiViendo} setViendoUno={setViendoUnBonsai}
                        control={control} setControl={setControl}/>
                    </div>
                )
            }
            {
                (viendoMuchasGuias && (
                    <div className="guias-otro-perfil">
                        <h2 className="guias-otro-perfil-h2">Guias</h2>
                        {(fetchingGuias &&
                        <h2 className="guias-otro-perfil-h2">Cargando Guias....</h2>)
                        ||
                        (!fetchingGuias && guias.length > 0 &&
                            <MostrarMuchasGuias guias={guias}
                            setIdMostrar={setIdGuiaViendo} setShowingMany={setViendoMuchasGuias}/>
                        )
                        ||
                        (!fetchingGuias && guias.length === 0 &&
                        <h2 className="guias-otro-perfil-h2">No hay guias...</h2>)}
                    </div>
                ))
                ||
                (!viendoMuchasGuias &&
                    <div className="one-guia-otro-perfil">
                        <GuiaOtroUsuarioComponent user={props.user} idGuia={idGuiaViendo}
                        firebase={props.firebase} setShowingMany={setViendoMuchasGuias}/>
                    </div>
                )
            }
        </div>
        <GoBackFixedButtonComponent goBackAction={props.setViendoUno} value={false}/>
    </div>)
}