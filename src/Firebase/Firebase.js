import app from 'firebase/app'
import 'firebase/storage'

const config = {
    apiKey: process.env.REACT_APP_apiKey,
    //authDomain: 'bonsapp-igsf.firebaseapp.com',
    //databaseURL: 'https://bonsapp-igsf.firebaseio.com',
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: 49485402387,
    adppId: process.env.REACT_APP_appId
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