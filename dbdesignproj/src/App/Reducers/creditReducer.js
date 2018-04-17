const creditPageReducer = (state = {error: false, success: false}, action) => {
    switch(action.type) {

        case 'creditSuccess': {
            return Object.assign({}, state, {error: false, success: true})
        }

        case 'creditFailure': {
            return Object.assign({}, state, {error: true, success: false})
        }


        default:
        {return state}
    }
}


export default creditPageReducer
