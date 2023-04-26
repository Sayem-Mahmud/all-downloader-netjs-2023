
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";


var app : FirebaseApp ;
export class Fb {
    static initFirebase() {
        const configs = {
            apiKey: "AIzaSyC0VKZyI9MNcPNurLY-We3OxQ67UW7fmX0",
            authDomain: "downloader-1ea60.firebaseapp.com",
            databaseURL: "https://downloader-1ea60-default-rtdb.firebaseio.com",
            projectId: "downloader-1ea60",
            storageBucket: "downloader-1ea60.appspot.com",
            messagingSenderId: "620071898168",
            appId: "1:620071898168:web:f8e75ccea6b608e7f1eacd"
        }

        app = initializeApp(configs);
    }

    static getFirestore(): Firestore {
        if (!app) {
            Fb.initFirebase()
        }
        const db = getFirestore(app)
        return db
    }
}


