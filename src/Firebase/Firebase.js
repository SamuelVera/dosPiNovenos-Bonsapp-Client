import app from 'firebase/app'
import 'firebase/storage'

const config = {
    apiKey: 'AIzaSyA9LP4E4LXV7kx37EJwQrK8uRHKuZt3eBQ',
    authDomain: 'bonsapp-igsf.firebaseapp.com',
    databaseURL: 'https://bonsapp-igsf.firebaseio.com',
    projectId: 'bonsapp-igsf',
    storageBucket: 'bonsapp-igsf.appspot.com',
    messagingSenderId: 49485402387,
    adppId: '1:49485402387:web:61233e83d606a683'
}

class Firebase{

    constructor() {
        app.initializeApp(config)
        this.storageRef = app.storage().ref()
        this.imageRef = this.storageRef.root
    }

        //Referencias son 2 casos
        //Foto de un bonsai:
        //  images/idBonsai/nombreFoto.jpg
        //PDF de una guía:
        //  pdfs/idGuia/nombrePDF.pdf
        //this.storageRef.root.child(reference).put(file)
        //this.storageRef.root.child(reference).getDownloadURL()

}

export default Firebase