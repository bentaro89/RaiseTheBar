import firebase from 'firebase';

const config = require('./key.json')
firebase.initializeApp(config);
const database = firebase.database();

  export function addScore(Score) {
    database.ref('Scores/').push({
      Score
    });
  }

  export function fetchScores(callback){
    database.ref('Scores/').on('value', (snapshot) => {
      callback(snapshot.val());
    })
  }

