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

function errData(err){
  console.log(err);
}

export {database, friendsRef, obtainData, errData};
export default firebaseApp.firestore();
