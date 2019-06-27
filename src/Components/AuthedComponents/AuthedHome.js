import React, { useState } from 'react'
import Navbar from './NavbarComponent/Navbar'
import UserProfile from './ProfileComponent/UserProfile'
import Guias from './GuiasComponent/GuiasComponent'
import OtrosUsuariosComponent from './OtrosBonsaiComponent/OtrosUsuariosComponent'
import '../AuthedComponents/NavbarComponent/NavbarStyles.css'


function AuthedHome(props) {

    const [inProfile, setInProfile] = useState(true)
    const [inGuias, setInGuias] = useState(false)
    const [inOtrosBonsai, setInOtrosBonsai] = useState(false)

    return(
        <div className="authed-div">
            <Navbar setInProfile={setInProfile} setInGuias={setInGuias} setAuthed={props.setAuthed}
                setInOtrosBonsai={setInOtrosBonsai}/>
            {
                (inProfile && <UserProfile user={props.user}/>)
                ||
                (inGuias && <Guias user={props.user}/>)
                ||
                (inOtrosBonsai && <OtrosUsuariosComponent user={props.user}/>)
            }
        </div>
    )
}

export default AuthedHome