import React, { useState } from 'react'
import Modal from 'react-awesome-modal'
import axios from 'axios'

import './GuiasStyles.css'

export default function AgregarResenaComponent(props){

    const [modalVisible, setModalVisible] = useState(false)

    const handleSubmit = (e) => {
        props.setUploadingResena(true)
        if(props.status === 3){ //No ha reseñado esta guía
            axios.post('/add-resena',{
                idguia: props.idGuia,
                idusuario: props.idusuario,
                puntuacion: e.target.puntuacion.value,
                opinion: e.target.opinion.value,
                fecha: new Date()
            })
            .then(res => {
                const { status, msg } = res.data
                alert(msg)
                if(status === 2){
                    props.setControl(!props.control)
                    setModalVisible(false)
                }
                props.setUploadingResena(false)
            })
            .catch(err => {
                throw err
            })
            e.target.opinion.value = ''
            e.target.puntuacion.value = 0
        }else{ //Si ha reseñado
            axios.post('/update-resena',{
                idguia: props.idGuia,
                idusuario: props.idusuario,
                puntuacion: e.target.puntuacion.value,
                opinion: e.target.opinion.value,
                fecha: new Date()
            })
            .then(res => {
                const { status, msg } = res.data
                alert(msg)
                if(status === 2){
                    props.setControl(!props.control)
                    setModalVisible(false)
                }
                props.setUploadingResena(false)
            })
            .catch(err => {
                throw err
            })
            e.target.opinion.value = ''
            e.target.puntuacion.value = 0
        }
    }

    const openModal = () => {
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    const checkPermisos = () => {
        axios.post('/fetch-rango',{
            idusuario: props.idusuario
        })
        .then(res => {
            const { status, data } = res.data
            if(status === 2){
                if(data.id >= 2){
                    openModal()
                }else{
                    alert('No posees los privilegios del rango Komono para reseñar una guía')
                }
            }
        })
        .catch(err => {
            throw err
        })
    }

    return(<div className="modal-form">
        <Modal
            visible={modalVisible}
            width="400"
            height="300"
            effect="fadeInLeft"
            onClickAway={() => {closeModal()}}
        > 
            <div>
                <h2>{props.title}</h2>
                {
                    props.uploadingResena &&
                    <h2>Subiendo Resena...</h2>
                }
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(e)
                }}>
                    <div>
                        <label>Opinion</label>
                        <input name='opinion' type='text' maxLength={100} placeholder='Da tu opinion sobre esta guia'
                        defaultValue={props.resena.opinion}/>
                    </div>
                    <div>
                        <label>Puntuacion</label>
                        <input name='puntuacion' type='number' min={0} max={10}
                        defaultValue={props.resena.puntuacion}/>
                    </div>
                    {!props.uploadingResena &&
                        <button>Publicar</button>
                    }
                </form>
            </div>
            <button onClick={() => {
                closeModal()
            }}>Cerrar</button>
        </Modal>
        <button className="commonButton" onClick={() => {
            checkPermisos()
        }}>{props.title}</button>
    </div>)
}