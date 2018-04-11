var express = require('express'),
    sql = require('mysql');

var app = express();

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

var host="localhost";
var user="root";
var password="FILLIN";
var database="Project";

var con = sql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/credits/:movie', function(req, res) {
    //console.log(req.params.movie);
    con.query("SELECT * FROM Credit c INNER JOIN Movie m ON c.movieId=m.movieId",
        function(err, result) {
            var movies = [];
            for (var i = 0; i<result.length; i++) {
                if (result[i].name == req.params.movie) {
                    movies.push(result[i]);
                }
            }
            if (err) console.log(err);
            else res.send(movies);
    });
});

app.post('/new_user/:first/:last/:addr/:city/:state/:country/:zip/:email/:password/:pic/',
    function(req, res) {
    var query=`INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, ` +
            `country, email, password, profilePicture) VALUES (${req.params.first}, ${req.params.last}, ` +
            `${req.params.addr}, ${req.params.city}, ${req.params.state}, ${req.params.country},` +
            `${req.params.zip}, ${req.params.email}, ${req.params.password}, ${req.params.pic})`;
    con.query(query, function(err, result) {
        if (err) console.log(err);
        else res.send('Success');
    })
});



app.post('/loved/:movieid/:userid', function(req, res) {
    var query = `INSERT INTO LovedMovies (movieId, userId) ` +
        `VALUES (${req.params.movieid}, ${req.params.userid})`;
    con.query(query, function(err, results) {
        if (err) console.log(err);
        else res.send("Success");
    })
});


app.post('/credit/:role/:personid/:movieid', function(req, res) {
    var query=`INSERT INTO Credit (role, personid, movieid)
        VALUES (${req.params.role}, ${req.params.personid}, ${req.params.movieid}`;
    con.query(query, function(err, results) {
        if (err) console.log(err);
        else res.send('Success');
    })
});

app.get('/revenue', function(req, res) {
    var query='SELECT * FROM' +
        '(SELECT s.studioName AS studio, SUM(mo.dollarAmount) AS revenue ' +
        'FROM Movie m INNER JOIN Studio s ON m.studioId = s.studioId ' +
        'INNER JOIN MovieOrder mo ON m.movieId = mo.movieId ' +
        'GROUP BY s.studioName ' +
        'ORDER BY revenue DESC ' +
        'LIMIT 10) res;';
    con.query(query, function(err, results) {
        if (err) console.log(err);
        else res.send(results);
    })
});



app.get('/movies/:directorsName', function(req, res) {
    var query = 'SELECT m.name AS movieName, p.lastName ' +
        'FROM Movie m INNER JOIN Credit c ON m.movieId = c.movieId ' +
        'INNER JOIN Professional p ON c.personId = p.personId ' +
        'WHERE c.role = "Director"';
    con.query(query, function(err, results) {
        if (err) console.log(err);
        var movies = [];
        for(var i = 0; i < results.length; i++) {
            if (results[i].lastName == req.params.directorsName) {
                movies.push(results[i])
            }
        }
        res.send(movies);
    })
});


app.get('/moviesPics/:userid', function(req, res) {
    var query = 'SELECT m.name AS movieName, m.coverPicture AS moviePicture, su.userId ' +
        'FROM SiteUser su INNER JOIN MovieOrder mo ON su.userId = mo.userId ' +
        'INNER JOIN Movie m ON m.movieId = mo.movieId;';
    con.query(query, function(err, results) {
        if (err) console.log(err);
        var movies = [];
        for(var i = 0; i < results.length; i++) {
            if (results[i].userId == req.params.userid) {
                movies.push(results[i]);
            }
        }
        res.send(movies);
    })
});


//need to talk to Karan about the date field and pictures


app.get('/moviesLoved/:userid', function(req, res) {
    var query = 'FROM SiteUser su INNER JOIN LovedMovies lm ON su.userId = lm.userID ' +
    'EXCEPT ' +
    'SELECT m.name AS movieName ' +
    'FROM SiteUser su INNER JOIN MovieOrder ON su.userId = mo.userId ' +
    'INNER JOIN Movie m ON m.movieId = mo.movieId';
    con.query(query, function(err, results) {
        if (err) console.log(err);
        var movies = [];
        for(var i = 0; i < results.length; i++) {
            if (results[i].releaseDate<req.params.date && results[i].realeaseDate>req.params.date) {
                movies.push(results[i]);
            }
        }
        res.send(movies);
    })
});


app.get('/credited/:name', function(req, res) {
    var query = 'SELECT p.firstname || " " || p.lastname AS movieName, ' +
        'c.role AS role, p.picture AS personPicture, m.name ' +
        'FROM Professional p INNER JOIN Credit c ON p.personId = c.personId ' +
        'INNER JOIN Movie m ON m.movieId = c.movieId;';
    con.query(query, function(err, results) {
        if (err) console.log(err);
        var people = [];
        for(var i = 0; i < results.length; i++) {
            if (results[i].name=req.params.name) {
                people.push(results[i]);
            }
        }
        res.send(people);
    })
});



app.get('/revenue/:genre', function(req, res) {
    var query='SELECT res.genre FROM' +
        '(SELECT g.genreName AS genre, SUM(mo.dollarAmount) AS revenue ' +
        'FROM Movie m INNER JOIN Genre g ON m.genreId = g.genreId ' +
        'INNER JOIN MovieOrder mo ON m.movieId = mo.movieId ' +
        'GROUP BY g.genreName ' +
        'ORDER BY revenue DESC ' +
        'LIMIT 3) res;';
    con.query(query, function(err, results) {
        if (err) console.log(err);
        else res.send(results);
    })
});
