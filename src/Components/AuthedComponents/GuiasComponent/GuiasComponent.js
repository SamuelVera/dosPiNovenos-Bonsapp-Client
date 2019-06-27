import React, { useState } from 'react'
import DesplegarGuia from './DesplegarGuiaComponent'
import MisGuiasComponent from './MisGuiasComponent'

function Guias(props){

    const [viendoMias, setViendoMias] = useState(false)

    return(
        <div>
            {
                (!viendoMias
                && <DesplegarGuia user={props.user} setViendoMias={setViendoMias}/>)
                ||
                (viendoMias
                && <MisGuiasComponent user={props.user} setViendoMias={setViendoMias}/>)
            }
        </div>)
}

export default Guias