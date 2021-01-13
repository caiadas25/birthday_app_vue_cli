import { buildObject } from '../src/utils';
import { errData, obtainData } from '../src/firebase/firebaseInit';

export const mutations = {
    async setData(state, data){
        data = await obtainData();
        state.friends = buildObject(data);
    },
    async setUserSpecificFriends(state, data) {
        data = await getFriends();
        console.log('test')
        state.userSpecificfriends = buildObject(data);
    }
  };