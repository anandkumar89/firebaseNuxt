// import firebase from 'firebase'

// let firebaseConfig = {
//           apiKey: "AIzaSyBjyezIXZtdKnRKKAlYW1TDF28wnlAbHrs",
//           authDomain: "todo-ical.firebaseapp.com",
//           databaseURL: "https://todo-ical.firebaseio.com",
//           projectId: "todo-ical",
//           storageBucket: "todo-ical.appspot.com",
//           messagingSenderId: "405464436217",
//           appId: "1:405464436217:web:c8ee0a7f9bdde86db50128",
//           measurementId: "G-K3GNVHKXR6"
// };

// // let app = null
// // // console.log(firebase.apps)
// // console.log(firebase.apps.length)
// // if (!firebase.apps) {
//     // }
// try {
//     firebase.initializeApp(firebaseConfig)
// }catch (e) {
//     console.log('Error Initializing Firebase App, dafault already exists')
// }
// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const db = firebase.database();
// export var auth = firebase.auth();

// Server side code.
const admin = require('firebase-admin');
const serviceAccount = require('~/serviceAccountKey.json');

// The Firebase Admin SDK is used here to verify the ID token.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const admin;