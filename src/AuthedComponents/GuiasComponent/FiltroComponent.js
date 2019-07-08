import React from 'react';
import CategoriasDropdown from '../../Dropdowns/CategoriasDropdown'
import IdiomasDropdown from '../../Dropdowns/IdiomasDropdown'

function FiltroComponent(props){

    const handleSubmit = (e) => {
        if(!e.target.categorias.value && !e.target.idioma.value){
            alert("Elige un campo por el cual filtrar")
        }else{
            let categorias = []
            if(!!e.target.categorias.value){
                categorias.push(e.target.categorias.value)
            }else if(e.target.categorias.length){
                e.target.categorias.forEach(element => {
                    categorias.push(element.value)
                })
            }
            let idioma = []
            if(!!e.target.idioma.value){
                idioma.push(e.target.idioma.value)
            }
            props.setFetchFirst(true)
            props.setFiltros({
                categorias,
                idioma
            })
            props.setNoFilter(false)
        }
    }

    return(
        <div className="filtrar-container">
            <div className="label-filtrar">
                <h4>Filtrar:</h4>
            </div>
            <div className="not-label-filtrar">
                <form className="filtrar-form" onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(e)}
                }>
                    <div className="filtrar-form-categorias">
                        <CategoriasDropdown nameForm="categorias"/>
                    </div>
                    <div className="filtrar-form-idioma">
                        <IdiomasDropdown nameForm="idioma"/>
                    </div>
                    <button type="submit" className="form-button commonButton">Filtrar</button>
                    {
                    !props.noFilter
                    &&
                    <button onClick={() => {
                        props.setNoFilter(true)
                    }} className="filtrar-quitar-filtro commonButton">Quitar Filtro</button>
                }
                </form>
            </div>
            
        </div>
    )
}

export default FiltroComponent