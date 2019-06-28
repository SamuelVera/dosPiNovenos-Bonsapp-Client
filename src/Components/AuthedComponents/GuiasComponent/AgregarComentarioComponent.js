import React, { useState } from 'react'
import Modal from 'react-awesome-modal'
import axios from 'axios'

import './GuiasStyles.css'

export default function AgregarComentarioComponent(props){

    const [modalVisible, setModalVisible] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        props.setUploadingComentario(true)
        axios.post('/add-comment',{
            idguia: props.idGuia,
            idusuario: props.idusuario,
            contenido: e.target.contenido.value,
            fechapublicacion: new Date()
        })
        .then(res => {
            const { status, msg } = res.data
            alert(msg)
            if(status === 2){
                closeModal()
                props.setControlComentarios(!props.controlComentarios)
            }
            props.setUploadingComentario(false)
        })
        .catch(err => {
            throw err
        })
        e.target.contenido.value = ''
    }

    const openModal = () => {
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }


    return(<div className="modal-form">
        <Modal
            visible={modalVisible}
            width="400"
            height="300"
            effect="fadeInLeft"
            onClickAway={() => {closeModal()}}>
            <div>
                <h2>Comentar Guia</h2>
                {
                    props.uploadingComentario &&
                    <h2>Subiendo Comentario....</h2>
                }
                <form onSubmit={(e) => {
                    handleSubmit(e)
                }}>
                    <div>
                        <label>Comentario:</label>
                        <input type='text' placeholder='Escribe tu comentario...'
                        name='contenido' maxLength={120} requiredtxt='CAMPO VACIO!' required/>
                    </div>
                    {!props.uploadingComentario &&
                        <button>
                            Publicar
                        </button>
                    }
                </form>
                <button onClick={() => {
                    closeModal()
                }}>Cerrar</button>
            </div>
        </Modal>
        <button className="commonButton" onClick={() => {
            openModal()
        }}>Comentar</button>
    </div>)
}