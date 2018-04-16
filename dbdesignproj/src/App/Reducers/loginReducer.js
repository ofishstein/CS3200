const loginPageReducer = (state = {loggedIn: false, registeringFlag: false, loginError: false, registerError: false, user: '', regSuccess: false}, action) => {
    switch(action.type) {

        case 'loginSuccess': {
            return Object.assign({}, state, {loggedIn: true, loginError: false, user: action.user})
        }

        case 'registering': {
            return Object.assign({}, state, {registeringFlag: true})
        }

        case 'loginFailure': {
            return Object.assign({}, state, {loginError: true})
        }

        case 'registerSuccess': {
            return Object.assign({}, state, {registerError: false, registeringFlag: false, regSuccess: true})
        }

        case 'registerFailure': {
            return Object.assign({}, state, {registerError: true, regSuccess: false})
        }


        default:
        {return state}
    }
}


export default loginPageReducer
