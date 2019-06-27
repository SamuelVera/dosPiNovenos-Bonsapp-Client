import React from 'react'
import './FixedButtonsStyles.css'

function FixedButtons(props) {

    return(
        <div>
            <div>
                <button className='fixedBottomRightButton fixedBottomAdd' 
                        onClick={() => {
                            props.setViendoMias(true)
                        }
                    }>
                        <i className="fa fa-plus float">&#8594;</i>
                    </button>
                    <div className="label-container">
                        <div className="label-text">Ver Mis Guías</div>
                        <i className="fa fa-play label-arrow"></i>
                </div>
            </div>
        </div>
    )
}

export default FixedButtons