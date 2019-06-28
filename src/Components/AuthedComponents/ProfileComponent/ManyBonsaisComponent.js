import React from 'react'
import '../GuiasComponent/FixedButtonsStyles.css'


export default function ManyBonsaisComponent(props){
    
    return(<div className="perfil-muchos-bonsais-all">
        {props.bonsais.map((bonsai, index) => {
            return(
            <div key={bonsai.id} className="perfil-muchos-bonsais-item">
                <div className="perfil-muchos-bonsais-item-nobutton">
                    <div className="perfil-muchos-bonsais-item-info">
                        <h4>{bonsai.apodo}</h4>
                        <h4>{bonsai.fechacultivo}</h4>
                    </div>
                    <div className="perfil-muchos-bonsais-item-foto">
                        {
                            (!props.imagenes[index] &&
                            <h3>Sin imagen</h3>)
                            ||
                            (props.imagenes[index] &&
                            <img src={props.imagenes[index]} alt={`Bonsai ${index}`}/>)
                        }
                    </div>
                    {
                        props.deletingBonsai && props.idBonsaiDeleting === bonsai.id &&
                        <div className="perfil-muchos-bonsais-deleting">
                            <h2>Eliminando...</h2>
                        </div>
                    }
                </div>
                <div className="perfil-muchos-bonsais-buttons">
                    <button className='commonButton' onClick={() => {
                        props.setIdBonsaiViendo(bonsai.id)
                    }}>Ver Datos</button>
                    <button className='commonButton' onClick={() => {
                        props.handleEliminar(bonsai.id, bonsai.apodo)
                    }}>
                        Eliminar
                    </button>
                </div>
            </div>)
        })}
    </div>)
}