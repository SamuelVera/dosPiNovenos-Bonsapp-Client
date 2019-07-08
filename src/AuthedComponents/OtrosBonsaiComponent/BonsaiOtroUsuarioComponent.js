import React from 'react'
import ValoracionBonsaiComponent from './ValoracionBonsaiComponent'
import HistorialFotosOtroBonsaiComponent from './HistorialFotosOtroBonsaiComponent'
import { FirebaseContext } from '../../Firebase/index'

import './BonsaiOtroUsuarioStyles.css'

export default function BonsaiOtroUsuarioComponent(props){

    return(<div className="bonsai-otro-container">
        <div className="bonsai-otro-info">
            <div className="bonsai-otro-info-1">
                <h3>Id: {props.bonsai.id}</h3>
                <h3>{props.bonsai.apodo}</h3>
                <h3>Fecha cultivado: {props.bonsai.fechacultivo}</h3>
            </div>
            <div className="bonsai-otro-info-2">
                <h3>Fecha agregado: {props.bonsai.fechaagregado}</h3>
                <h3>Propietario: {props.bonsai.nombrePropietario}</h3>
                <h3>Especie: {props.bonsai.especie.nombrecomun}({props.bonsai.especie.nombrecientifico})</h3>
            </div>
            <div className="bonsai-otro-info-3">
                <h3>Tipo por su forma: {props.bonsai.tipoForm.nombre}</h3>
                <h3>Tipo por su tamaño ({props.bonsai.altura} cm): {props.bonsai.tipoTam.nombre} ({props.bonsai.tipoTam.alturaminima}-{props.bonsai.tipoTam.alturamaxima}) cm</h3>
            </div>
        </div>
        <div className="bonsai-otro-valoracion">
            <ValoracionBonsaiComponent idbonsai={props.bonsai.id} userid={props.userid}
            idpropietario={props.bonsai.idpropietario} control={props.control} setControl={props.setControl}/>
        </div>
        <div className="bonsai-otro-historial">
            <h4>Historial de imágenes</h4>
            <FirebaseContext.Consumer>
                {
                    firebase => <HistorialFotosOtroBonsaiComponent firebase={firebase} 
                                idbonsai={props.bonsai.id}/>
                }
            </FirebaseContext.Consumer>
        </div>
        <div className="bonsai-otro-return">
            <button className="commonButton" onClick={() => {
                props.setViendoUno(false)
            }}>Ocultar</button>
        </div>
    </div>)
}