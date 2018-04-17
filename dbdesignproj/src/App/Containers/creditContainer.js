import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React from 'react';
import {creditActor} from '../Store/actionTypes'
import { connect } from 'react-redux';


class Credit extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            actor: '',
            movieTitle:'',
            role: ''

        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Credit an existing actor/actress for a role in a movie"
                        />
                        <TextField
                            hintText="Enter your actor/actress name"
                            floatingLabelText="Name"
                            onChange = {(event,newValue) => this.setState({actor:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter movie title"
                            floatingLabelText="Title"
                            onChange = {(event,newValue) => this.setState({movieTitle:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter role"
                            floatingLabelText="Role"
                            onChange = {(event,newValue) => this.setState({role:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Credit" primary={true} style={style} onClick={(event) => this.props.credit(this.state.role, this.state.actor, this.state.movieTitle )}/>
                        {this.props.error? <span style={{color: 'red'}}>There was an error crediting</span> : null}
                        {this.props.success? <span style={{color: 'green'}}>Successfully Credited</span> : null}
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        credit: (actor, movie, role) => {
            if (role === "" || actor == "" || movie == "" ) {
                return
            }
            dispatch(creditActor(actor, movie, role))
        },
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        error: state.creditReducer.error,
        success: state.creditReducer.success
    }
}

const style = {
    margin: 15,
};

const CreditPageContainer = connect(mapStateToProps,mapDispatchToProps)(Credit)

export default CreditPageContainer;
