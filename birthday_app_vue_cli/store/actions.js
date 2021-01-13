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
    getFriends({commit}) {
      firebase.auth().onAuthStateChanged(user => {
          if(user) {
            console.log('email is ' + user.email)
            console.log(`I am going to get friends for user ${user.email}`);
            let userSpecificFriends = [];
            firebase.firestore().collection('people').where("user", "==", `${user.email}`).get().then((snapshot) => {
              snapshot.forEach(docSnap => {
                userSpecificFriends.push(docSnap.data())
                console.log(userSpecificFriends);
              })
              return;
            })
            commit('setUserSpecificFriends', userSpecificFriends)
          }
      })
    }
  };