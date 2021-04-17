import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDfHmf4DHFgvNdONkdWpt3KWCsJkHTWos0",
    authDomain: "raisethebar-32614.firebaseapp.com",
    projectId: "raisethebar-32614",
    storageBucket: "raisethebar-32614.appspot.com",
    messagingSenderId: "495399135396",
    appId: "1:495399135396:web:90619895325c6432c0de31",
    measurementId: "G-3YQ03SRQTB"
  };
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

  export function addDog(dogName) {
    const dogs = database.ref('Test1/');
    dogs.push({
          dogName
    });
}
