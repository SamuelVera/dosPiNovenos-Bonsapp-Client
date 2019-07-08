import React from 'react'
import './GuiasStyles.css'

function MostrarMuchasMisGuiasComponent(props){

    return(
    <div className="guias-container">
        {props.guias.map((row) => {
            return(
                <div key={row.id} className="guias-item">
                    <div className="guias-item-content">
                        <div className="guias-item-cont-guia">
                            <h4>{row.nombre}</h4>
                            <h4>{row.fechaPublicacion}</h4>
                        </div>
                        <div className="guias-item-cont-idioma">
                            <h4>{row.idioma}</h4>
                        </div>
                        <div className="guias-item-cont-usuario">
                            <h4>{row.usuario.nombre}</h4>
                            <h4>{row.usuario.correo}</h4>
                        </div>
                        <div className="guias-item-button">
                            {
                                props.deletingGuia && props.IdDeletingGuia === row.id &&
                                <h4>Eliminando...</h4>
                            }
                            {
                                !props.deletingGuia && props.IdDeletingGuia !== row.id &&
                                <button className="commonButton" onClick={() => {
                                    props.setIdMostrar(row.id)
                                    props.setShowingMany(false)
                                }}>Ver</button>
                            }
                            {
                                !props.deletingGuia && props.IdDeletingGuia !== row.id &&
                                <button id="delete" onClick={() => {
                                    props.handleDelete(row.id, row.nombre, props.firebase)
                                }}>&#215;</button>
                            }
                        </div>
                    </div>
                    <div className="guias-item-footer">
                        <p>Categorias: </p>
                        <div className="guias-item-categorias">
                            {row.categorias.map(row => 
                                <p key={row.id}>
                                    {row.nombre}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )
        })}
    </div>)
}

export default MostrarMuchasMisGuiasComponent