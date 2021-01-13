import { buildObject } from '../src/utils';
import { 
    errData, 
    obtainData, 
    getUserSpecificData 
} from '../src/firebase/firebaseInit';

export const mutations = {
    async setData(state, data){
        data = await obtainData();
        state.friends = buildObject(data);
        //console.log(state.friends)
    },
    async setUserSpecificData(state, data) {
        data = await getUserSpecificData();
        state.userSpecificFriends = buildObject(data);
        console.log(state.userSpecificFriends)
    }
  };