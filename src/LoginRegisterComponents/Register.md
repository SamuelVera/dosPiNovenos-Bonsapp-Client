```js
<Register 
    registerUser={
        function(user){
            alert(`Enviando para registrar ${user.correo}
                ${user.password} ${user.nombre}
                ${user.direccion} ${user.idpais}`)
            }}
    setLogin={
        function(value){
            alert('Volviendo al Login')
        }
    }
/>
```