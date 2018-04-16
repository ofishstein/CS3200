const ordersReducer = (state = {user: '', reports: null}, action) => {
    switch(action.type) {

        case 'loginSuccess': {
            return Object.assign({}, state, { user: action.user})
        }

        case 'gotReports': {
            return Object.assign({}, state, {reports: action.reports}) //TODO: or whatever this is in databse
        }




        default:
        {return state}
    }
}


export default ordersReducer
