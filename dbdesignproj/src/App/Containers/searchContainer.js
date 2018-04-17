import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import _ from 'lodash' // eslint-disable-line
import MovieComponent from '../Components/movieComponent'
import { connect } from 'react-redux';
import {DROPDOWNCHANGE, searchMovies, searchDirectors, searchTheater, love, order} from '../Store/actionTypes'

const styles = {
    customWidth: {
        width: 200
    }
};

const style = {
    margin: 15,
};

class SearchContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchValue: ''
        }
    }



    render() {
        let movies = this.props.movies;
        let theaters = this.props.theaters;
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Search"
                        />
                        <DropDownMenu value={this.props.searchType} onChange={this.props.handleChange}>
                            <MenuItem value={1} primaryText="Movie Name" />
                            <MenuItem value={2} primaryText="Director Name" />
                            <MenuItem value={3} primaryText="Theater" />
                        </DropDownMenu>
                        <TextField
                            hintText="Enter your search keyword"
                            floatingLabelText="Search"
                            onChange = {(event,newValue) => this.setState({searchValue:newValue})}
                        />
                        <RaisedButton label="Search" primary={true} style={style} onClick={(event) => this.props.trySearch(this.state.searchValue, this.props.searchType)}/>
                        <div>
                            {movies? _.map(movies, (movie) => {return <MovieComponent id={movie.id} image={movie.moviePicture} name={movie.movieName} releasedate={movie.releaseDate.slice(0,4)} credits={movie.credits} fromSearch={true} theaterid={null} love={this.props.love} order={this.props.order} userid={this.props.userId} key={movie.id}/>}) : null}
                        </div>
                        <div>
                            {theaters? _.map(theaters, (theater) => {
                                let theaterMovies = _.map(this.props.allMovies, (movie) => {return <MovieComponent id={movie.id} image={movie.moviePicture} name={movie.movieName} releasedate={movie.releaseDate.slice(0,4)} credits={movie.credits} fromSearch={true} theaterid={theater.vendorId} love={this.props.love} order={this.props.order} userid={this.props.userId} key={movie.id}/>})
                                return <div>
                                    <div style={{marginBottom: "1rem"}}>{theater.name + " " + theater.location}</div>
                                    {theaterMovies}
                                </div>
                            }) : null}
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>


        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        searchType: state.searchReducer.searchType,
        movies: state.searchReducer.movies,
        theaters: state.searchReducer.theaters,
        userId: state.searchReducer.user,
        allMovies: state.searchReducer.allMovies
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleChange: (event, index, value) => {
            dispatch({type: DROPDOWNCHANGE , value: value})
        },
        trySearch: (searchValue, searchType) => {
            switch(searchType) {
                case 1: {
                    dispatch(searchMovies(searchValue))
                    break
                }

                case 2: {
                    dispatch(searchDirectors(searchValue))
                    break
                }

                case 3: {
                    dispatch(searchTheater(searchValue))
                    break
                }
            }
        },
        love: (movieid, userid) => {
            love(movieid, userid)
        },
        order: (number, movieid, theaterid, userid) => {
            order(number, movieid, theaterid, userid)
        }
    }
}

const SearchPageContainer = connect(mapStateToProps,mapDispatchToProps)(SearchContainer)

export default SearchPageContainer;
