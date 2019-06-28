import React, {useState} from 'react'
import AddBonsai from './bonsaiform'
import PerfiYucaComponent from './PerfilYucaComponent'
import axios from 'axios'
import { FirebaseContext } from '../../../Firebase/index'
import './UserProfile.css'

function UserProfile(props) {

    const [bonsaiForm, setBonsaiForm] = useState(false)
    const [uploadingBonsai, setUploadingBonsai] = useState(false)

    const addBonsai = (dataBonsai) => {
        setUploadingBonsai(true)
        axios.post('/add-bonsai',{
            dataBonsai,
            userId: props.user.id
        })
        .then((res) => {
            const { status, msg } = res.data
            alert(msg)
            if(status === 2){
                setBonsaiForm(false)
            }
            setUploadingBonsai(false)
        })
        .catch(err => {
            throw err
        })
    }

    return(
        <div className='body'>
            {
                (!bonsaiForm && 
                <FirebaseContext.Consumer>
                    {firebase => <PerfiYucaComponent user={props.user} setBonsaiForm={setBonsaiForm} 
                    firebase={firebase}/>}
                </FirebaseContext.Consumer>)
               ||
               (bonsaiForm && 
               <AddBonsai setBonsaiForm={setBonsaiForm} addBonsai={addBonsai}
               uploadingBonsai={uploadingBonsai}/>)
            }
        </div>
    )
}



export default UserProfile