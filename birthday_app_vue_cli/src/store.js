import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { buildObject } from './fetchDataService';
import { errData, obtainData } from './firebase/firebaseInit';
import firebase from 'firebase';

export default new Vuex.Store({
  state: {
    friends: [],
    navItems: [
      {
        path: "/",
        title: "Homepage"
      },
      {
        path: "/catalog",
        title: "Catalog"
      },
      {
        path: "/addPerson",
        title: "Add Person"
      },
      {
        path: "/login",
        title: "Login"
      },
      {
        path: "/register",
        title: "Register"
      }
    ]
  },
  getters: {
    getData: state => {
      return state.friends
    },
    getNavItems: state => {
      return state.navItems
    }
  },

  actions: {
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

  },

  mutations: {
    async setData(state, data){
      data = await obtainData();
      state.friends = buildObject(data);
    }
  },
})
