import React, { useState, useEffect } from 'react'
import MostrarMuchasGuias from './MostrarMuchasGuias'
import MostrarUnaGuia from './MostrarUnaGuia'
import FiltroComponent from './FiltroComponent'
import FixedButtons from './FixedButtonsComponent'
import { FirebaseContext } from '../../../Firebase/index'
import axios from 'axios'
import './DesplegarStyles.css'
import './FixedButtonsStyles.css'


function DesplegarGuia(props) {

    const [paginas, setPaginas] = useState(0)
    const [deploy, setDeploy] = useState(10)
    const [guias, setGuias] = useState([])
    const [noFilter, setNoFilter] = useState(true)
    const [fetching, setFetching] = useState(true)
    const [showingMany, setShowingMany] = useState(true)
    const [filtros, setFiltros] = useState(
        {
            categorias: [],
            idioma: []
        })
    const [idMostrar, setIdMostrar] = useState(0)
    const [fetchFirst, setFetchFirst] = useState([])

    const setGuiasFromResponse = (status, data) => {
        if(status === 2){
            setGuias(data)
            localStorage.setItem('guias', JSON.stringify(data))
        }else{
            alert(data)
        }
    }

    const fetchNoFilter = (isSub) => {
        axios.post('/fetch-guias',({
            paginas, 
            deploy,
            idusuario: props.user.id
        }))
        .then((res) => {
            if(isSub){
                const { status, data } = res.data
                setGuiasFromResponse(status, data)
                setFetching(false)
            }
        })
        .catch(err => {
            throw err
        })
    }

    const fetchFilter = (isSub) => {
        if(filtros.idioma.length !== 0 && filtros.categorias.length !== 0){
            //Traer por categorias e idioma
            axios.post('/fetch-guias-idioma-categoria',{
                paginas,
                deploy,
                idiomaToFetch: filtros.idioma[0],
                categoriasIdToFetch: filtros.categorias,
                idusuario: props.user.id
            })
            .then((res) => {
                if(isSub){
                    const { status, data } = res.data
                    setGuiasFromResponse(status, data)
                }
            })
            .catch(err => {throw err})
        }
        else if(filtros.idioma.length === 0){
            //Traer guias por categorias
            axios.post('/fetch-guias-categorias',{
                paginas,
                deploy,
                categoriasIdToFetch: filtros.categorias,
                idusuario: props.user.id
            })
            .then((res) => {
                if(isSub){
                    const { status, data } = res.data
                    setGuiasFromResponse(status, data)
                    setFetching(false)
                }
            })
            .catch(err => {throw err})
        }else{
            //Traer guías por idioma
            axios.post('/fetch-guias-idioma',{
                paginas,
                deploy,
                idiomaToFetch: filtros.idioma[0],
                idusuario: props.user.id
            })
            .then((res) => {
                if(isSub){
                    const { status, data } = res.data
                    setGuiasFromResponse(status, data)
                    setFetching(false)
                }
            })
            .catch(err => {throw err})
        }
    }

    useEffect(() => {
        setFetching(true)
    },[])

    useEffect(() => {
        let isSub = true
        if(!navigator.onLine){
            let guias = JSON.parse(localStorage.getItem('guias'))
            if(guias){
                setGuias(guias)
                setFetching(false)
            }
        }else{
            if(noFilter){
                fetchNoFilter(isSub)
            }else{
                fetchFilter(isSub)
            }
            if(fetchFirst){
                setPaginas(0)
            }
        }
        
        return () => isSub = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[deploy, noFilter, filtros])

    useEffect(() => {
        let isSub = true
        setFetching(true)
        if(!fetchFirst){
            if(!noFilter){
                fetchFilter(isSub)
            }else{
                fetchNoFilter(isSub)
            }
        }
        setFetching(false)
        return () =>  isSub = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[paginas])

    return(
        <div className='body'>
            {
                !showingMany 
                &&
                <FirebaseContext.Consumer>{
                    firebase => <MostrarUnaGuia user={props.user} idGuia={idMostrar} setShowingMany={setShowingMany} 
                                firebase={firebase}/>
                }</FirebaseContext.Consumer>
            }
            {
                showingMany && !fetching
                &&
                <MostrarMuchasGuias guias={guias} 
                setIdMostrar={setIdMostrar} setShowingMany={setShowingMany}/>
            }
            {
                showingMany && !fetching
                && 
                <div>
                    <button className='previous round pretty-button'
                    onClick={() => {
                        if(paginas !== 0){
                            setFetchFirst(false)
                            setPaginas(paginas-1)
                        }
                    }}>&#8249;</button>
                    <button className='next round pretty-button'
                    onClick={() => {
                        if(guias.length === deploy){
                            setFetchFirst(false)
                            setPaginas(paginas+1)
                        }
                    }}>&#8250;</button>
                    <h5>Pagina {paginas+1}</h5>
                </div>
            }
            {
                showingMany && !fetching &&
                <div className="bottom">
                    <FiltroComponent setNoFilter={setNoFilter} noFilter={noFilter}
                    setFiltros={setFiltros} setFetchFirst={setFetchFirst}/>
                </div>
            }
            {
                fetching &&
                <div>
                    <h1>Cargando Guias...</h1>
                </div>
            }
            <FixedButtons setDeploy={setDeploy} setPaginas={setPaginas}
            setViendoMias={props.setViendoMias}/>
        </div>
    )
}

export default DesplegarGuia