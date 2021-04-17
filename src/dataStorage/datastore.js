import firebase from 'firebase';

const config = require('./key.json')
firebase.initializeApp(config);
const database = firebase.database();

  export function addScore(Score) {
    const dogs = database.ref('Lyricss');
    dogs.push({
      Score
    });
  }

  export function fetchLyrics(){
    database.ref('Lyrics').on('value', (snapshot) => {
      snapshot.val();
    })
  }

