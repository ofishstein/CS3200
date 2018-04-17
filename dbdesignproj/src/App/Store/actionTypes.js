import { connect } from 'react-redux';
import _ from 'lodash';

//Actions
export const LOGIN_SUCCESS = 'loginSuccess'
export const LOGIN_FAILURE = 'loginFailure'
export const REGISTERING = 'registering'
export const REGISTER_SUCCESS = 'registerSuccess'
export const REGISTER_FAILURE = 'registerFailure'
export const MOVIESEARCHCOMPLETE = 'searchComplete'
export const THEATERSEARCHCOMPLETE = 'theaterSearchComplete'
export const CREDIT_SUCCESS = 'creditSuccess'
export const CREDIT_FAILURE = 'creditFailure'
export const FETCHED_ORDERS = 'fetchedOrders'
export const GOTREPORTS = 'gotReports'
export const DROPDOWNCHANGE = 'dropDownChange'


const localhost = "http://localhost:3000"

export function creditActor(role, actor, movie) {
    let fetchString = localhost + "/credit/" + role + "/" + actor + "/" + movie;
    return (dispatch) => {
        fetch(fetchString, {method: 'post'}).then((res) => {
            res.json().then((res) => {
                if (res.stat !== "Error") {
                    dispatch({type: CREDIT_SUCCESS})
                }
                else {
                    dispatch({type: CREDIT_FAILURE})
                }
            })

        })
    }

}

export function tryLogin(user, pw) {
    let fetchString = localhost + "/login/" + user + "/" + pw
    return (dispatch) =>  { fetch(fetchString).then((res) => {
        res.json().then((res) => {
            if (res[0].userId) {
                dispatch({type: LOGIN_SUCCESS , user: res[0].userId})
            }
            else {
                dispatch({type: LOGIN_FAILURE})
            }})

    }
    )
    }
}

export function tryRegister(first, last, addr, city, country, zip, email, pw, URLpic) {
    let fetchString = localhost + "/new_user/" + first + "/" + last + "/" + addr + "/" + city + "/" + country + "/" + zip + "/" + email + "/" + pw + "/" + URLpic

    return (dispatch) => {
        fetch(fetchString, {method: 'post'}).then((res) => {
            res.json().then((res) => {
                if (res.stat === "Error") {
                    dispatch({type: REGISTER_FAILURE})
                }
                else {
                    dispatch({type: REGISTER_SUCCESS})
                }
            })
        })
    }
}

export function fetchMoviesAndAll(user) {
    // try to fetch ordered movies for a user
    let fetchString1 = localhost + "/moviesPics/" + user;
    let fetchString2 = localhost + "/revenue";
    let fetchString3 = localhost + "/revenue/genre";
    let fetchString4 = localhost + "/moviesLoved/" + user;
    // do string 4 when ready
    let ordersPageData = {};

    return (dispatch) => {
        fetch(fetchString1).then((res) => {
            res.json().then((res) => {
                ordersPageData.movies = res;
                fetch(fetchString2).then((res) => {
                    res.json().then((res) => {
                        ordersPageData.studios = res;
                        fetch(fetchString3).then((res) => {
                            res.json().then((res) => {
                                ordersPageData.genres = res;
                                dispatch({type: FETCHED_ORDERS, movies: ordersPageData.movies, studios: ordersPageData.studios, genres: ordersPageData.genres, loy: ordersPageData.loy })

                                // fetch(fetchString4).then((res) => {
                                //     res.json().then((res) => {
                                //         ordersPageData.loy = res;
                                //         dispatch({type: FETCHED_ORDERS, movies: ordersPageData.movies, studios: ordersPageData.movies, genres: ordersPageData.movies, loy: ordersPageData.loy })
                                //     })
                            })
                        })
                    })
                })
            })
        })

    }
}

export function searchDirectors(lastName) {
    let fetchString = localhost + "/movies/" + lastName
    let movies;
    return (dispatch) => {
        fetch(fetchString).then((res) => {
            res.json().then((res) => {
                movies = res;
                _.forEach((movies), (movie) => {
                    fetch(localhost + "/credits/" + movie.movieName).then((res) => {
                        res.json().then((res) => {
                            movie.credits = res;
                            dispatch({type: MOVIESEARCHCOMPLETE, movies: movies})

                        })
                    })
                })

            })
        })
    }
}

export function searchMovies(name) {
    let fetchString = localhost + "/movie/" + name

    let movies;
    return (dispatch) => {
        fetch(fetchString).then((res) => {
            res.json().then((res) => {
                movies = res;
                _.forEach((movies), (movie) => {
                    fetch(localhost + "/credits/" + movie.movieName).then((res) => {
                        res.json().then((res) => {
                            movie.credits = res;
                            dispatch({type: MOVIESEARCHCOMPLETE, movies: movies})

                        })
                    })
                })

            })
        })
    }
}

export function love(movieid, userid) {
    let fetchString = localhost + "/loved/" + movieid + "/" + userid
    fetch(fetchString, {method: 'post'})
}

export function order(number, movieid, userid, vendorid, ) {
    let fetchString = localhost + "/theaterOrder/" + number + "/" + movieid + "/" + userid + "/" + vendorid
    fetch(fetchString, {method: 'post'})
}

export function getReports(userid, directorFirst, directorLast, year) {
    let fetchString1 = localhost + "/topStudios/" + userid
    let fetchString2 = localhost + "/favoriteGenre/" + userid
    let fetchString3 = localhost + '/mostLoved'
    let fetchString4 = localhost + "/directorsBestSelling/" + directorFirst + "/" + directorLast
    let fetchString5 = localhost + '/yearBoxOfficeHit/' + year
    let reportData = {reports: {}}

    return (dispatch) => {
        fetch(fetchString1).then((res) => {
            res.json().then((res) => {
                reportData.topStudios = res;
                fetch(fetchString2).then((res) => {
                    res.json().then((res) => {
                        reportData.favGenre = res;
                        fetch(fetchString3).then((res) => {
                            res.json().then((res) => {
                                reportData.mostLoved = res;
                                fetch(fetchString5).then((res) => {
                                    res.json().then((res) => {
                                        reportData.boxOfficeHits = res;
                                        fetch(fetchString4).then((res) => {
                                            res.json().then((res) => {
                                                reportData.bestSelling = res;
                                                dispatch({type: GOTREPORTS, reports: reportData })                                    })
                                        })
                                    })
                                })
                            })
                        })
                    })

                })
            })
        })
    }
}


export function searchTheater(city) {
    let fetchString = localhost + "/theater/" + city
    let theaters;
    let movies;
    return (dispatch) => {
        fetch(fetchString).then((res) => {
            res.json().then((res) => {
                theaters = res;
                fetch(localhost + "/allmovies").then((res) => {
                    res.json().then((res) => {
                        movies = res
                        dispatch({type: THEATERSEARCHCOMPLETE, theaters: theaters, allMovies: movies })
                    })
                })
            })
        })
    }
}
