module.exports = {
    components: 'src/**/*.{js,jsx,ts,tsx}',
    ignore: [
        'src/Firebase/*.js',
        'src/index,js',
        'src/serviceWorkers.js'
    ],
    sections: [
        {
            name: 'Introducción',
            content: 'docs/introduction.md'
        },{
           name: 'Documentación',
           content: 'docs/documentation.md',
           sections:[{
               name: 'Entorno dev',
               sections:[{
                    name: 'Instalación',
                    content: 'docs/installation.md'
               },
               {
                    name: 'Dependencias',
                    content: 'docs/dependencies.md'
               },
               {
                   name: 'Montar Servidor Dev',
                   contenct: 'docs/setupdev.md'
               }]
            },{
                name: 'UI',
                content: 'docs/UI.md',
                sections:[{
                    name: 'Login/Register',
                    content: 'docs/loginregister.md',
                    components: [
                        'src/LoginRegisterComponents/*.js',
                    ]
                },{
                    name: 'Navbar',
                    content: 'docs/navbar.md'
                },{
                    name: 'Perfil del Usuario',
                    content: 'docs/perfil.md',
                    components: [
                        'src/AuthedComponents/ProfileComponent/AddBonsai.js',
                        'src/AuthedComponents/ProfileComponent/UpdateUserDatosComponentjs',
                        'src/AuthedComponents/ProfileComponent/UpdateBonsaiForm.js',
                    ]
                },{
                    name: 'Guias',
                    content: 'docs/guias.md',
                    components: [
                        'src/AuthedComponents/GuiasComponent/AgregarGuiaComponent.js',
                        'src/AuthedComponents/GuiasComponent/AgregarResenaComponent.js',
                        'src/AuthedComponents/GuiasComponent/AgregarComentarioComponent.js',
                        'src/AuthedComponents/GuiasComponent/UpdateGuiaComponent.js',
                    ]
                },{
                    name: 'Otros Usuarios',
                    content: 'docs/otros.md',
                },{
                    name: 'Desconectar',
                    content: 'docs/disconnect.md'
                },{
                    name: 'Buttons',
                    content: 'docs/fixed.md'
                }]
            }] 
        }
    ],
    assetsDir: 'docs/assets/'
};