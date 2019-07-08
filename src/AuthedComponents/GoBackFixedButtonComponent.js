import React from 'react'
import './GuiasComponent/FixedButtonsStyles.css'

export default function GoBackFixedButtonComponent(props){

    return(<div>
        <button className='fixedBottomRightButton fixedBottomAdd' 
        onClick={() => 
            props.goBackAction(props.value)
        }>
            <i className="fa fa-plus float">&#8592;</i>
        </button>
        <div className="label-container">
        <div className="label-text">Volver</div>
            <i className="fa fa-play label-arrow"></i>
        </div>
    </div>)
}