var express = require('express'),
    sql = require('mysql');

var app = express();

app.use((req, res, next) => {
  const origin = req.get('origin');

  // TODO Add origin validation
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

var host="localhost";
var user="root";
var password="DLkmmAY!!!";
var database="dbdesignproject";

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
    var query = `SELECT * FROM Credit c ` +
        `INNER JOIN Movie m ON c.movieId=m.movieId ` +
        `WHERE Name=${req.params.movie}`;
    con.query(query,
        function(err, results) {
            if (err) {
                console.log(err);
                res.send("Error")
            }
            res.send(results);
    });
});

app.post('/new_user/:first/:last/:addr/:city/:state/:country/:zip/:email/:password/:pic/',
    function(req, res) {
    var query=`INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, ` +
            `country, email, password, profilePicture) VALUES (${req.params.first}, ${req.params.last}, ` +
            `${req.params.addr}, ${req.params.city}, ${req.params.state}, ${req.params.country},` +
            `${req.params.zip}, ${req.params.email}, ${req.params.password}, ${req.params.pic})`;
    con.query(query, function(err, result) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        else res.send('Success');
    })
});



app.post('/loved/:movieid/:userid', function(req, res) {
    var query = `INSERT INTO LovedMovies (movieId, userId) ` +
        `VALUES (${req.params.movieid}, ${req.params.userid})`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        else res.send("Success");
    })
});


app.post('/credit/:role/:personid/:movieid', function(req, res) {
    var query=`INSERT INTO Credit (role, personid, movieid)
        VALUES (${req.params.role}, ${req.params.personid}, ${req.params.movieid}`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
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
        if (err) {
            console.log(err);
            res.send("Error");
        }
        else res.send(results);
    })
});



app.get('/movies/:lastName', function(req, res) {
    var query = `SELECT m.name AS movieName, m.coverPicture AS moviePicture, m.releaseDate AS releaseDate, m.movieId AS id ` +
        `FROM Movie m INNER JOIN Credit c ON m.movieId = c.movieId ` +
        `INNER JOIN Professional p ON c.personId = p.personId ` +
        `WHERE c.role = "Director" AND ` +
        `p.lastName='${req.params.lastName}'`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })
});

app.get('/movie/:movieName', function(req, res) {
    var query = `SELECT m.name AS movieName, m.coverPicture AS moviePicture, m.releaseDate AS releaseDate, m.movieId AS id ` +
        `FROM Movie m INNER JOIN Credit c ON m.movieId = c.movieId ` +
        `INNER JOIN Professional p ON c.personId = p.personId ` +
        `WHERE m.name='${req.params.movieName}'`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })
});


app.get('/moviesPics/:userid', function(req, res) {
    var query = `SELECT m.name AS movieName, m.coverPicture AS moviePicture, su.userId, m.releaseDate AS releaseDate, m.movieId AS id ` +
        `FROM SiteUser su INNER JOIN MovieOrder mo ON su.userId = mo.userId ` +
        `INNER JOIN Movie m ON m.movieId = mo.movieId ` +
        `WHERE su.userId=${req.params.userid}`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error");
        }
        res.send(results);
    })
});


//need to talk to Karan about the date field and pictures

//needs to specify that the movies were released this year
app.get('/moviesLoved/:userid', function(req, res) {
    var query = `FROM SiteUser su INNER JOIN LovedMovies lm ON su.userId = lm.userID ` +
        `EXCEPT ` +
        `SELECT m.name AS movieName ` +
        `FROM SiteUser su INNER JOIN MovieOrder ON su.userId = mo.userId ` +
        `INNER JOIN Movie m ON m.movieId = mo.movieId; `;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error");
        }
        var movies = [];
        for(var i = 0; i < results.length; i++) {
            if (results[i].releaseDate<req.params.date && results[i].releaseDate>req.params.date) {
                movies.push(results[i]);
            }
        }
        res.send(movies);
    })
});


app.get('/credited/:name', function(req, res) {
    var query = `SELECT p.firstname || " " || p.lastname AS movieName, ` +
        `c.role AS role, p.picture AS personPicture, m.name ` +
        `FROM Professional p INNER JOIN Credit c ON p.personId = c.personId ` +
        `INNER JOIN Movie m ON m.movieId = c.movieId ` +
        `WHERE Name=${req.params.name}`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })
});



app.get('/revenue/:genre', function(req, res) {
    var query='SELECT res.genre, revenue FROM' +
        '(SELECT g.genreName AS genre, SUM(mo.dollarAmount) AS revenue ' +
        'FROM Movie m INNER JOIN Genre g ON m.genreId = g.genreId ' +
        'INNER JOIN MovieOrder mo ON m.movieId = mo.movieId ' +
        'GROUP BY g.genreName ' +
        'ORDER BY revenue DESC ' +
        'LIMIT 3) res;';
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        else res.send(results);
    })
});

app.get('/login/:email/:password', function(req, res) {
    var query=`SELECT * FROM SiteUser su ` +
        `WHERE email='${req.params.email}' AND ` +
        `password='${req.params.password}'`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })
});

app.get('/theater/:city', function(req, res) {
    var query='SELECT * FROM TheaterVendor' +
        'WHERE location=city';
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })
});

//REPORT QUERIES

//Find a user's top 3 movie studios that they've ordered from
app.get('/topStudios/:userid', function(req, res) {
    var query=`SELECT res.studio FROM ` +
        `(SELECT s.studioName AS studio, COUNT(*) AS genreCount ` +
        `FROM SiteUser su INNER JOIN MovieOrder mo ON su.userId = mo.userId ` +
        `INNER JOIN Movie m ON m.movieId = mo.movieId ` +
        `INNER JOIN Studio s ON m.studioId = s.studioId ` +
        `WHERE su.userId = ${req.params.userid} ` +
        `GROUP BY s.studioId ` +
        `ORDER BY genreCount DESC ` +
        `LIMIT 3) res;`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })

});

// Find a user's favorite genre based on loved movies
app.get('/topStudios/:userid', function(req, res) {
    var query=`SELECT res.genre FROM ` +
        `(SELECT g.genreName AS genre, COUNT(*) AS genreCount ` +
        `FROM SiteUser su INNER JOIN LovedMovies lm ON su.userId = lm.userId ` +
        `INNER JOIN Movie m ON m.movieId = lm.movieId ` +
        `INNER JOIN Genre g ON m.genreId = g.genreId ` +
        `WHERE su.userId = ${req.params.userid} ` +
        `GROUP BY g.genreId ` +
        `ORDER BY genreCount DESC ` +
        `LIMIT 1) res;`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })
});

// Find the most loved movies by all users that are available for streaming
app.get('/mostLoved', function(req, res) {
    var query= 'SELECT movieName FROM ' +
        '(SELECT m.Name AS movieName, COUNT(*) AS movieCount ' +
        'FROM LovedMovies lm INNER JOIN Movie m ON lm.movieId = m.movieId ' +
        'INNER JOIN MovieOrder mo ON mo.movieId = m.movieId ' +
        'INNER JOIN StreamingOrder so ON so.confirmationNumber = mo.confirmationNumber ' +
        'GROUP BY m.Name ' +
        'ORDER BY movieCount DESC) res;';
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })
});


// Find a specific director's best selling films
app.get('/directorsBestSelling/:first/:last', function(req, res) {
    var query = `SELECT movieName FROM ` +
        `(SELECT m.name AS movieName, SUM(mo.dollarAmount) AS revenue ` +
        `FROM Movie m INNER JOIN Credit c ON m.movieId = c.creditId ` +
        `INNER JOIN MovieOrder mo ON mo.movieId = m.movieId ` +
        `INNER JOIN Professional p ON p.personId = c.personId ` +
        `WHERE c.role = "Director" AND ` +
        `p.firstname = ${req.params.first} ` +
        `AND p.lastname = ${req.params.first} ` +
        `GROUP BY m.name ` +
        `ORDER BY revenue DESC) res;`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error");
        }
        res.send(results);
    })
});

// Find a year's box office hits
app.get('/yearBoxOfficeHit', function(req, res) {
    var query = `SELECT movieName FROM ` +
	    `(SELECT m.Name AS movieName, SUM(mo.dollarAmount) AS revenue ` +
	    ` FROM Movie m INNER JOIN MovieOrder mo ON m.movieId = mo.movieId ` +
        `INNER JOIN TheaterOrder tho ON mo.confirmationNumber = tho.confirmationNumber ` +
	    `WHERE m.releaseDate < [PARAM] AND m.releaseDate > <[PARAM] ` +
	    `GROUP BY m.Name ` +
	    `ORDER BY revenue DESC) res;`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })
});
