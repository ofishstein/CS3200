import React from 'react'
import _ from 'lodash' // eslint-disable-line
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {getReports} from "../Store/actionTypes"
import { connect } from 'react-redux'
import MovieComponent from '../Components/movieComponent'

const style = {
    margin: 15,
};

class Reports extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            directorFirst: '',
            directorLast: '',
            year:''

        }
    }

    render() {
        let studioString;
        let genreString;

        if (this.props.reports) {
            if (this.props.reports.topStudios.length > 0) {
                studioString = "Your Top Studios are "
                for (let i = 0; i < this.props.reports.topStudios.length; i++) {
                    studioString = studioString + " " + this.props.reports.topStudios[i].studio
                }

                if (this.props.reports.favGenre.length > 0) {
                    genreString = "Your Favorite Genre is " + this.props.reports.favGenre[0].genre
                }

            }

        }
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Input a Director Name and a Year to Generate Reports"
                        />
                        <TextField
                            hintText="Enter director first name"
                            floatingLabelText="First Name"
                            onChange = {(event,newValue) => this.setState({directorFirst:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter director name"
                            floatingLabelText="Last Name"
                            onChange = {(event,newValue) => this.setState({directorLast:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter year"
                            floatingLabelText="Year"
                            onChange = {(event,newValue) => this.setState({year:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Generate Reports" primary={true} style={style} onClick={(event) => this.props.getReports(this.props.user, this.state.directorFirst,this.state.directorLast, this.state.year)}/>
                        {this.props.reports?
                            <div>
                                <span style = {{marginBottom: '.5rem'}}>{studioString} </span>
                                <br/>
                                <span style = {{marginBottom: '.5rem'}}>{genreString} </span>
                                <br/>
                                <span style = {{marginBottom: '.5rem'}}>{"Director " + this.state.directorFirst + " " + this.state.directorLast + "'s top films" }</span>
                                <br/>
                                {_.map(this.props.reports.bestSelling, (movie) => {return <MovieComponent id={movie.id} image={movie.moviePicture} name={movie.movieName} releasedate={movie.releaseDate.slice(0,4)} credits={null} fromSearch={false} theaterid={null} love={null} order={null} userid={null} key={movie.id} />})}
                                <span>{"Box Office Hits From " + this.state.year }</span>
                                <br/>
                                {_.map(this.props.reports.boxOfficeHits, (movie) => {return <MovieComponent id={movie.id} image={movie.moviePicture} name={movie.movieName} releasedate={movie.releaseDate.slice(0,4)} credits={null} fromSearch={false} theaterid={null} love={null} order={null} userid={null} key={movie.id} />})}
                                <span>{"Most Popular Streaming Movies"}</span>
                                {_.map(this.props.reports.mostLoved, (movie) => {return <MovieComponent id={movie.id} image={movie.moviePicture} name={movie.movieName} releasedate={movie.releaseDate.slice(0,4)} credits={null} fromSearch={false} theaterid={null} love={null} order={null} userid={null} key={movie.id} />})}

                            </div> : null

                        }
                    </div>
                </MuiThemeProvider>
            </div>


        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getReports: (userid, directorFirst, directorLast, year) => {
            dispatch(getReports(userid, directorFirst, directorLast, year))
        },
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        reports: state.reportsReducer.reports,
        user: state.reportsReducer.user
    }
}

const ReportsPageContainer = connect(mapStateToProps,mapDispatchToProps)(Reports)

export default ReportsPageContainer;
