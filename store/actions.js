import firebase from 'firebase';
// asyncronous way to update the state in the store

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

    //when this action is called, it commits the 'setLoggedInStatus' mutation, which puts the 'data' into the state. 
    //The 'data' being the loggedIn variable in this case.
    getLoggedInStatus({commit}) {
      firebase.auth().onAuthStateChanged(user => {
        let loggedIn = false
        if(user) {
          loggedIn = true
          commit('setLoggedInStatus', loggedIn)
        }
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