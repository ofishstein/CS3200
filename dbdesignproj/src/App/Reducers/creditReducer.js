const creditPageReducer = (state = {error: false}, action) => {
    switch(action.type) {

        case 'creditSuccess': {
            return Object.assign({}, state, {error: false})
        }

        case 'creditFailure': {
            return Object.assign({}, state, {error: true})
        }


        default:
        {return state}
    }
}


export default creditPageReducer
