import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'

function IdiomasDropdown(props){

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/fetch-idiomas')
        .then(res => {
            const { code, data } = res.data
            if(code === 2){
                let aux = []
                data.forEach(element => {
                    aux = [...aux, {value: element.isocode, label: element.nombre}]
                });
                setData(aux)
            }else{
                alert(data)
            }
        }).catch(err => {
            throw err
        })
    },[])

    return (
        <Select 
        name={props.nameForm}
        defaultValue={props.defaultValue}
        placeholder='Elige un idioma'
        closeMenuOnSelect={true}
        components={makeAnimated()}
        options={data}/> 
    )
}

export default IdiomasDropdown