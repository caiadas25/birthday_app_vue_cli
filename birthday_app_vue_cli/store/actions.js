import firebase from 'firebase';

export const actions = {
    obtainData({commit}) {
        const db = firebase.firestore();
        console.log('it works!')
        return new Promise((resolve, reject) => {
          let childDataArray = [];
          db.collection('people').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
              childDataArray.push(doc.data());
            });
            resolve(childDataArray);
          })
          commit('setData', childDataArray)
        });
      },
  };