import firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const friendsRef = database.ref("people");
const db = firebase.firestore();

function obtainData() {
  return new Promise((resolve, reject) => {
    let childDataArray = [];
    db.collection('people').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        childDataArray.push(doc.data());
      });
      resolve(childDataArray);
    })
  });
}

function getUserSpecificData() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let userSpecificData = [];
        firebase.firestore().collection('people').where("user", "==", `${user.email}`).get().then((snapshot) => {
          snapshot.forEach(docSnap => {
            userSpecificData.push(docSnap.data())
          })
          resolve(userSpecificData);
        })
      }
    })
  })
}

function errData(err){
  console.log(err);
}

export {
  database, 
  friendsRef, 
  obtainData, 
  errData, 
  getUserSpecificData
};
export default firebaseApp.firestore();
