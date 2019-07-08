import React from 'react'
import '../GuiasComponent/FixedButtonsStyles.css'
import './BonsaisOtroUsuarioStyles.css'

export default function ManyBonsaisComponent(props){
    return(<div className="container-bonsais-otro-user">
        {props.bonsais.map((bonsai, index) => {
            return(<div key={bonsai.id} className="bonsai-otro-user">
                <div className="bosai-otro-user-info">
                    <h4>{bonsai.apodo}</h4>
                    <h4>{bonsai.fechacultivo}</h4>
                    {
                        (!props.imagenes[index] &&
                        <h4>Sin imagen</h4>)
                        ||
                        (props.imagenes[index] &&
                        <img src={props.imagenes[index]} alt={`Bonsai ${index}`} height="80" width="80" />)
                    }
                </div>
                <div className="bonsai-otro-user-go">
                    <button className='commonButton' onClick={() => {
                        props.setIdBonsaiViendo(bonsai.id)
                    }}>Ver Datos</button>
                </div>
            </div>)
        })}
    </div>)
}