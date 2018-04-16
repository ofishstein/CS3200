import React from 'react'
import {Provider} from 'react-redux'
import store from './App/Store/configureStore'
import LoginPageContainer from "./App/Containers/loginContainer"


export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <LoginPageContainer/>
            </Provider>
        )
    }
}
