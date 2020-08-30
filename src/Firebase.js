import firebase from 'firebase';
const firebaseConfig = {
//Please use your configuration
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export { db };