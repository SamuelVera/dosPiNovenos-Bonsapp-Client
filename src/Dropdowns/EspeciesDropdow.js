import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'

function EspeciesDropdown(props){

    const [data, setData] = useState([])
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        let isSub = true
        setFetching(true)
        axios.get('/fetch-especies')
        .then(res => {
            if(isSub){
                const { status, data } = res.data
                if(status === 2){
                    let aux = []
                    data.forEach(element => {
                        aux = [...aux, 
                            {value: element.id,
                            label: element.nombrecomun+`(${element.nombrecientifico})`}]
                    })
                    setData(aux)
                    setFetching(false)
                }else{
                    alert(data)
                }
            }
        })
        .catch(err => {
            throw err
        })
    return () => isSub = false
    },[])

    return (<div>
        {   
            !fetching &&
            <Select 
            name={props.nameForm}
            defaultValue={props.defaultValue}
            placeholder='Elige la especie de tú bonsai'
            closeMenuOnSelect={true}
            components={makeAnimated()}
            options={data}/> 
        }
        </div>
    )
}

export default EspeciesDropdown