import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StarRatings from 'react-star-ratings'

export default function ValoracionBonsaiComponent(props){

    const [control, setControl ] = useState(false)
    const [valoracionGlobal, setValoracionGlobal ] = useState(0)
    const [valoracionDada, setValoracionDada ] = useState(0)
    const [fetching, setFetching ] = useState(true)

    useEffect(() => {
        setFetching(true)
        let isSub = true
        axios.post('/fetch-valoracion',{
            idbonsai: props.idbonsai
        })
        .then(res => {
            if(isSub){
                const { status, data } = res.data
                if(status === 2){
                    setValoracionGlobal(parseFloat(data))
                }else{
                    alert(data)
                }
            }
        })
        .catch(err => {
            throw err
        })
        if(props.userid !== props.idpropietario){
            axios.post('/fetch-valoracion-dada',{
                idusuario: props.userid,
                idbonsai: props.idbonsai
            })
            .then(res => {
                if(isSub){
                    const { status, data } = res.data
                    if(status === 2){
                        setValoracionDada(data)
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
        return () =>  isSub = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[control])

    const handleChange = (puntuacion) => {
        if(valoracionDada === 0){
            axios.post('/new-valoracion',{
                puntuacion,
                idusuario: props.userid,
                idbonsai: props.idbonsai
            })
            .then(res => {
                const { puntuacion, msg } = res.data
                alert(msg)
                setValoracionDada(puntuacion)
                setControl(!control)
                props.setControl(!props.control)
            })
            .catch(err => {
                throw err
            })
        }else{
            axios.post('/update-valoracion',{
                puntuacion,
                idusuario: props.userid,
                idbonsai: props.idbonsai
            })
            .then(res => {
                const { status, msg, puntuacion } = res.data
                alert(msg)
                if(status === 2){
                    setValoracionDada(puntuacion)
                    setControl(!control)
                    props.setControl(!props.control)
                }
            })
            .catch(err => {
                throw err
            })
        }
    }

    return(<div className="valorar-container">
        <div className="valorar-global">
            <h3>Valoracion Global: {valoracionGlobal}</h3>
        </div>
        {!fetching &&
        <div className="valorar-start">
            <h3>Valorar: </h3>
            <StarRatings 
                rating={valoracionDada}
                starRatedColor="yellow"
                starHoverColor="yellow"
                name="valoracion"
                changeRating={(e) => {handleChange(e)}}
            />
        </div>}
    </div>)
}