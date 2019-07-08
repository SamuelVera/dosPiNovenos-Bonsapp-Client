import React, { useState, useEffect } from 'react'
import ComunidadComponent from './ComunidadComponent'
import PerfilOtroUsuarioComponent from './PerfilOtroUsuarioComponent'
import axios from 'axios'
import { FirebaseContext } from '../../Firebase/index'
import './OtrosUsuariosStyles.css'

function OtrosUsuariosComponent(props){

    const [usuarios, setUsuarios] = useState([])
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [viendoUno, setViendoUno] = useState(false)
    const [usuarioViendo, setUsuarioViendo] = useState({})
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        let isSub = true
        setFetching(true)
        if(!navigator.onLine){
            let users = JSON.parse(localStorage.getItem('otrosUsers'))
            if(users){
                setUsuarios(users)
                setPages(localStorage.getItem('otrosUsersPag'))
                setFetching(false)
            }
        }else{
            axios.post('/fetch-otros-usuarios',{
                idusuarioconectado: props.user.id,
                page
            })
            .then(res => {
                if(isSub){
                    const { status, data, pages } = res.data
                    if(status === 2){
                        setUsuarios(data)
                        setPages(Math.ceil(pages))
                        localStorage.setItem('otrosUsers', JSON.stringify(data))
                        localStorage.setItem('otrosUsersPag', Math.ceil(pages))
                        setFetching(false)
                    }else{
                        alert(data)
                    }
                }
            })
            .catch(err => {
                throw err
            })
        }
        
        return () => isSub = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page])

    const handlePreviousPage = () => {
        if(page !== 0){
            setPage(page-1)
        }
    }

    const handleNextPage = () =>{
        if( usuarios.length === 10){
            setPage(page+1)
        }
    }

    return(
        <div className="body">
            {fetching && <div>
                <h1>Cargando Usuarios...</h1>
            </div>}
            {(!viendoUno && !fetching &&
                <div>
                    <ComunidadComponent usuarios={usuarios} setViendoUno={setViendoUno}
                    setUsuarioViendo={setUsuarioViendo}/>
                    <div>
                        <h3 className="page-number">Pag. {page+1} / {pages}</h3>
                        <button className="previous round pretty-button" onClick={() => { handlePreviousPage() }}>&#8249;</button>
                        <button className="next round pretty-button" onClick={() => { handleNextPage() }}>&#8250;</button>
                    </div>
                </div>
            )||
            ( viendoUno && !fetching &&
                <FirebaseContext.Consumer>
                    {firebase => 
                    <PerfilOtroUsuarioComponent userid={props.user.id} 
                    usuario={usuarioViendo} setViendoUno={setViendoUno} 
                    setUsuarioViendo={setUsuarioViendo} user={props.user} firebase={firebase}/>}
                </FirebaseContext.Consumer>
            )}
        </div>)
}

export default OtrosUsuariosComponent