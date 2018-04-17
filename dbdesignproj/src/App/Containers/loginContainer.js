import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React from 'react';
import { connect } from 'react-redux';
import {tryLogin, tryRegister, REGISTERING} from '../Store/actionTypes';
import OrdersPageContainer  from './ordersContainer';
import SearchPageContainer  from './searchContainer';
import CreditPageContainer  from './creditContainer';
import ReportsPageContainer from './reportsContainer';

class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            username: props.user,
            password:'',
            first: '',
            last: '',
            address: '',
            city: '',
            country: '',
            zip: '',
            email: '',
            picURL: ''


        }
    }

    render() {
        let error;

        if (this.props.loginError) {
            error = <div style={{color:"red"}}> Username or pw was incorrect</div>;
        }
        else if (this.props.registerError) {
            error = <div style={{color:"red"}}> There was a problem creating that user </div>;
        }
        else if (this.props.regSuccess) {
            error = <div style={{color:"green"}}> Registration successful, please sign in</div>
        }
        else {
            error = <div></div>;
        }


        let auth;

        if (!this.props.registeringFlag) {
            auth = <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            hintText="Enter your Email"
                            floatingLabelText="Email"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        {error}
                        <RaisedButton label="Register" primary={true} style={style} onClick={(event) => this.props.registering()}/>
                        <RaisedButton label="Sign In" primary={true} style={style} onClick={(event) => this.props.login(this.state.username, this.state.password)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        }
        else {
            auth = <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Register"
                        />
                        <TextField
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange = {(event,newValue) => this.setState({first:newValue})}
                        />
                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange = {(event,newValue) => this.setState({last:newValue})}
                        />
                        <TextField
                            hintText="Enter your Address"
                            floatingLabelText="Address"
                            onChange = {(event,newValue) => this.setState({address:newValue})}
                        />
                        <TextField
                            hintText="Enter your City"
                            floatingLabelText="City"
                            onChange = {(event,newValue) => this.setState({city:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Country"
                            floatingLabelText="Country"
                            onChange = {(event,newValue) => this.setState({country:newValue})}
                        />
                        <TextField
                            hintText="Enter your Zip"
                            floatingLabelText="Zip Code"
                            onChange = {(event,newValue) => this.setState({zip:newValue})}
                        />
                        <TextField
                            hintText="Enter your Email"
                            floatingLabelText="Email"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <TextField
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <TextField
                            hintText="Enter your Pic URL"
                            floatingLabelText="Pic URL"
                            onChange = {(event,newValue) => this.setState({picURL:newValue})}
                        />
                        {error}
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.props.register(this.state.first, this.state.last, this.state.address, this.state.city, this.state.country, this.state.zip, this.state.username, this.state.password, this.state.picURL)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        }



        //if login succeeds go to Tabs
        return (!this.props.loggedIn? auth :
            <Tabs>
                <TabList>
                    <Tab style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}>Orders</Tab>
                    <Tab style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}>Search</Tab>
                    <Tab style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}>Reports</Tab>
                    <Tab style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}>Credit</Tab>
                </TabList>

                <TabPanel>
                    <OrdersPageContainer/>
                </TabPanel>
                <TabPanel>
                    <SearchPageContainer/>
                </TabPanel>
                <TabPanel>
                    <ReportsPageContainer/>
                </TabPanel>
                <TabPanel>
                    <CreditPageContainer/>
                </TabPanel>
            </Tabs>)


    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        registeringFlag: state.loginReducer.registeringFlag,
        loggedIn: state.loginReducer.loggedIn,
        loginError: state.loginReducer.loginError,
        registerError: state.loginReducer.registerError,
        user: state.loginReducer.user,
        regSuccess: state.loginReducer.regSuccess
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (user, pw) => {
            if (user == "" || pw == "") {
                return
            }
            dispatch(tryLogin(user, pw))
        },
        registering: () => {
            dispatch({type: REGISTERING})
        },
        register: (first, last, addr, city, country, state, zip, email, pw, URLpic) => {
            if (first == "" || last == "" || addr == "" || city == "" || country == "" || state == "" || zip == "" || email == "" || pw == "" || URLpic == "") {
                return
            }
            dispatch(tryRegister(first, last, addr, city, state, country, zip, email, pw, URLpic))
        }


    }
}

const style = {
    margin: 15,
};

const LoginPageContainer = connect(mapStateToProps,mapDispatchToProps)(Login)

export default LoginPageContainer;
