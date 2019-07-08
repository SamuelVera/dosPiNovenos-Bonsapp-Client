```js
<Login
    logInUser={user => {
        alert(`Enviando ${user.correo} y ${user.password}
        al servidor de auth`)
    }}
    setLogin={value => {
        alert('Vamos al Register')
    }}
/>
```