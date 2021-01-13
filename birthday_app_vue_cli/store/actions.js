import firebase from 'firebase';

export const actions = {
    getWholeDataAction({commit}) {
        //console.log('it works!')
        return new Promise((resolve, reject) => {
          let childDataArray = [];
          firebase.firestore().collection('people').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
              childDataArray.push(doc.data());
            });
            resolve(childDataArray);
          })
          commit('setData', childDataArray)
        });
      },
    getUserSpecificDataAction({commit}) {
      console.log('getUserSpecificDataAction works!')
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
            commit('setUserSpecificData', userSpecificData)
          }
        })
      })
    },
    createUser() {
      alert('user created')
      const currentUser = firebase.auth().currentUser;
      const uid = currentUser.uid;
      const userData = { 
        email: currentUser.email,
        lastLoginTime: new Date(),
      };
      firebase.firestore().doc(`/users/${uid}`).set(userData);
    },
  };