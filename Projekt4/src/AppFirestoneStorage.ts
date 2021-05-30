import {AppStorage} from "./AppStorage"
import firebase from 'firebase';
import { firebaseConfig } from './config';

export class AppFirestoneStorage{
    
    db: firebase.firestore.Firestore;
    private constructor() { 
        const firebaseApp = firebase.initializeApp(firebaseConfig);
        this.db = firebaseApp.firestore();

}
}