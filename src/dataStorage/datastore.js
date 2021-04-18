import firebase from 'firebase';

const config = require('./key.json')
firebase.initializeApp(config);
const database = firebase.database();

// Add a name and score to the database
export function addScore(name, score) {
  database.ref('Scores/').push({
    name, score
  });
}

// Returns all names and scores
export function fetchScores(callback){
  database.ref('Scores/').on('value', (snapshot) => {
    callback(snapshot.val());
  })
}

