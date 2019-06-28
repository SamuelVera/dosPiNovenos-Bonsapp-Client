import React, {useState} from 'react'
import HistorialFotosComponent from './HistorialFotosComponent'
import UpdateBonsaiForm from './UpdateBonsaiForm'
import ValoracionBonsaiComponent from '../OtrosBonsaiComponent/ValoracionBonsaiComponent'
import GoBackFixedButtonComponent from '../GoBackFixedButtonComponent'
import { FirebaseContext } from '../../../Firebase/index'

export default function OneBonsaiComponent(props){

    const [updating, setUpdating] = useState(false)
    const [uploadingBonsai, setUploadingBonsai] = useState(false)

    return(<div>
        {
            !props.bonsai.id &&
            <div className="perfil-one-bonsai">
                <h1>Cargando Bonsai...</h1>
            </div>
        }
        {(!updating && props.bonsai.id &&
        <div className="perfil-one-bonsai">
            <div className="perfil-one-bonsai-info">
                <div className="perfil-one-bonsai-info-basic">
                    <h3>{props.bonsai.id}</h3>
                    <h3>{props.bonsai.apodo}</h3>
                    <ValoracionBonsaiComponent userid={props.bonsai.idpropietario} 
                    idpropietario={props.bonsai.idpropietario} idbonsai={props.bonsai.id}/>
                </div>
                <div className="perfil-one-bonsai-info-tipo">
                    <h3>Especie: {props.bonsai.especie.nombrecomun} ({props.bonsai.especie.nombrecientifico})</h3>
                    <h3>Tipo por Tamaño ({props.bonsai.altura}cm): {props.bonsai.tipoTam.nombre} ({props.bonsai.tipoTam.alturaminima}-{props.bonsai.tipoTam.alturamaxima})cm</h3>
                    <h3>Tipo por Forma: {props.bonsai.tipoForm.nombre} ({props.bonsai.tipoForm.descripcion})</h3>
                </div>
                <div className="perfil-one-bonsai-info-fechas">
                    <h3>Fecha de cultivo: {props.bonsai.fechacultivo.toLocaleString()}</h3>
                    <h3>Fecha de agregado: {props.bonsai.fechaagregado.toLocaleString()}</h3>
                    <button className="commonButton" onClick={() => {
                        setUpdating(true)
                    }}>Actualizar</button>
                </div>
            </div>
            <div className="perfil-one-bonsai-historial-container">
                <h4>Historial de fotos</h4>
                <FirebaseContext.Consumer>
                    {
                        firebase => <HistorialFotosComponent firebase={firebase}
                        idpropietario={props.bonsai.iduser} idbonsai={props.bonsai.id} />
                    }
                </FirebaseContext.Consumer>
            </div>
        </div>)
        ||(updating && props.bonsai.id &&
            <UpdateBonsaiForm bonsai={props.bonsai} setUpdating={setUpdating} 
            control={props.control} setControl={props.setControl} uploadingBonsai={uploadingBonsai}
            setUploadingBonsai={setUploadingBonsai}/>)}
        {!updating && <GoBackFixedButtonComponent goBackAction={props.setViendoUno} value={false}/>}
    </div>)
}