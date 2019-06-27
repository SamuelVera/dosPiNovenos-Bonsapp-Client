import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'

function CategoriasDropdown(props){

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/fetch-categorias')
        .then(res => {
            const { code, data } = res.data
            if(code === 2){
                let aux = []
                data.forEach(element => {
                    aux = [...aux, {value: element.id, label: element.nombre}]
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
        placeholder='Elige categorias'
        closeMenuOnSelect={false}
        components={makeAnimated()}
        isMulti
        options={data}/>
    )
}

export default CategoriasDropdown