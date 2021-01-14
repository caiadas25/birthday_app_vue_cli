export const getters = {
    getData: state => {
        return state.friends
    },
    getUserSpecificData: state => {
        return state.userSpecificFriends
    },
    getNavItems: state => {
        return state.navItems
    },
    getLoggedInStatus: state => {
        return state.loggedInStatus
    }
  };