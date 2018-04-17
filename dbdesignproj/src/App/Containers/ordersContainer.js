import React from 'react'
import _ from 'lodash'
import {fetchMoviesAndAll} from '../Store/actionTypes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import MovieComponent from '../Components/movieComponent'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { connect } from 'react-redux'


class Orders extends React.Component {

    constructor(props){
        super(props);

        //TODO: fetch data, set
        props.fetchMoviesAndAll(props.user)

    }



    render() {
        let movies = this.props.movies;
        let loy = this.props.loy;
        let genres = this.props.genres;
        let studios = this.props.studios;

        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Orders"
                        />
                        <div style={{marginBottom: ".5rem"}}>Ordered Movies</div>
                        <br/>
                        <div>
                            {movies? _.map(movies, (movie) => {return <MovieComponent id={movie.id} image={movie.moviePicture} name={movie.movieName} releasedate={movie.releaseDate.slice(0,4)} credits={null} fromSearch={false} theaterid={null} love={null} order={null} userid={null} key={movie.id} />}) : <div style={{color: 'red', marginBottom: '.3rem'}}> SORRY WE FOUND NONE </div>}

                        </div>
                        <div style={{marginBottom: ".5rem"}}>Loved Movies You Havent Ordered This Year</div>
                        <br/>
                        <div>
                            {loy? _.map(loy, (movie) => {return <MovieComponent id={movie.id} image={movie.moviePicture} name={movie.movieName} releasedate={movie.releaseDate.slice(0,4)} credits={null} fromSearch={false} theaterid={null} userid={null} love={null} order={null} key={movie.id}/>}) : <div style={{color: 'red', marginBottom: '.3rem'}}> SORRY WE FOUND NONE </div>}
                        </div>
                        <div style={{marginBottom: ".5rem"}}>Top 3 Genres (Revenue)</div>
                        <br/>
                        {genres?
                            <Table selectable={false}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Genre Name</TableHeaderColumn>
                                        <TableHeaderColumn>Revenue</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} >
                                    {
                                        _.map(genres, (genre) =>
                                        {
                                            return <TableRow>
                                                <TableRowColumn>{genre.genre}</TableRowColumn>
                                                <TableRowColumn>{genre.revenue}</TableRowColumn>
                                            </TableRow>})}
                                </TableBody>
                            </Table> : null
                        }
                        <div style={{marginBottom: ".5rem"}}>Top Studios (Revenue)</div>
                        <br/>
                        {studios?
                            <Table selectable={false}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Studio Name</TableHeaderColumn>
                                        <TableHeaderColumn>Revenue</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {
                                        _.map(studios, (studio) =>
                                        {
                                            return <TableRow>
                                                <TableRowColumn>{studio.studio}</TableRowColumn>
                                                <TableRowColumn>{studio.revenue}</TableRowColumn>
                                            </TableRow>})}
                                </TableBody>
                            </Table> : null
                        }
                    </div>
                </MuiThemeProvider>
            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        movies: state.ordersReducer.movies,
        genres: state.ordersReducer.genres,
        studios: state.ordersReducer.studios,
        loy: state.ordersReducer.loy,
        user: state.ordersReducer.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchMoviesAndAll: (userid) => {
            dispatch(fetchMoviesAndAll(userid))
        }
    }


}

const OrdersPageContainer = connect(mapStateToProps,mapDispatchToProps)(Orders)

export default OrdersPageContainer;
