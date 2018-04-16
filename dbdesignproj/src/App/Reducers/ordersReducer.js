const ordersReducer = (state = {user: '', movies: null, genres: null, studios: null, loy: null}, action) => {
    switch(action.type) {

        case 'loginSuccess': {
            return Object.assign({}, state, {user: action.user})
        }

        case 'fetchedOrders': {
            return Object.assign({}, state, {movies: action.movies, genres: action.genres, studios: action.studios, loy: action.loy}) //TODO: or whatever this is in databse
        }


        default:
        {return state}
    }
}


export default ordersReducer
