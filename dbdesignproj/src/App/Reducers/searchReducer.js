const searchReducer = (state = {user: '', searchType: 1, movies: null, theaters: null, allMovies: null}, action) => {
    switch(action.type) {

        case 'loginSuccess': {
            return Object.assign({}, state, {loggedIn: true, user: action.user})
        }

        case 'searchComplete': {
            return Object.assign({}, state, {movies: action.movies, theaters: null})
        }

        case 'theaterSearchComplete': {
            return Object.assign({}, state, {theaters: action.theaters, movies: null}) //TODO: or whatever this is in databse
        }

        case 'dropDownChange': {
            return Object.assign({}, state, {searchType: action.value})
        }

        default:
        {return state}
    }
}


export default searchReducer
