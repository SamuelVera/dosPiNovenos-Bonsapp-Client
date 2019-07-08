import React, { useState, useEffect } from 'react'
import Login from './LoginRegisterComponents/Login'
import Register from './LoginRegisterComponents/Register'
import AuthedHome from './AuthedComponents/AuthedHome'
import { Offline } from "react-detect-offline";
import axios from 'axios'

import './HomeStyles.css'

/**
 * Root de los componentes, nivel más alto
 * 'Enrruta' los componentes de autentificación 
 * y la parte interna de la PWA
 */
export default function Home() {

    const [authed, setAuthed] = useState(false)
    const [login, setLogin] = useState(true)
    const [user, setUser] = useState({})

    useEffect(() => {
        let isSub = true
        if(!navigator.onLine){
            let user = JSON.parse(localStorage.getItem('user'))
            if(!user){
                setUser(user)
                setAuthed(true)
            }
        }else{
            axios.post('/askLogged')
            .then(res => {
                if(isSub){
                    const { status, user, msg } = res.data
                    if(status === 1){
                        setUser(user)
                        alert(msg)
                        localStorage.setItem('user', user)
                        setAuthed(true)
                    }
                }
            })
        }
        return () => isSub = false
    },[])

    const logInUser = (userData) => {
        axios.post('/login', userData)
        .then(res => { 
            const { status, user, msg } = res.data
            if(status === 1){
                setUser(user)
                localStorage.setItem('user', JSON.stringify(user))
                alert(msg)
                setAuthed(true)
            }else{
                alert(msg)
            }
        })
        .catch(err => {
            console.log('Error')
            throw err
        })
    }

    const registerUser = (userData) => {
        axios.post('/register', userData)
        .then(res => {
            const { status, msg } = res.data
            alert(msg)
            if(status===2){
                setLogin(true)
            }
        })
        .catch(err => {throw err})
    }

    return(
        <div>
                {
                    (!authed
                    &&
                    ((login && <Login logInUser={logInUser} setLogin={setLogin}/>)
                    ||
                    (!login && <Register registerUser={registerUser} setLogin={setLogin}/>)))
                    ||
                    (authed
                    &&
                    <AuthedHome user={user} setAuthed={setAuthed}/>)
                }
                <Offline>
                    <div className="offline">
                        <p>Te encuentras desconectado! Comprueba tu conexion</p>
                    </div>
                </Offline>
        </div>
    )
}