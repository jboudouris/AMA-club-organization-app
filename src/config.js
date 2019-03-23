import firebase from 'firebase';
let config = {
  apiKey: "AIzaSyB9kMpxhilLczlWR57TLOM8IMxKuUEcRW0",
    authDomain: "react-firebase-cd68d.firebaseapp.com",
    databaseURL: "https://react-firebase-cd68d.firebaseio.com",
    projectId: "react-firebase-cd68d",
    storageBucket: "react-firebase-cd68d.appspot.com",
    messagingSenderId: "57969678002"
};
let app = firebase.initializeApp(config);
export const db = app.database();
