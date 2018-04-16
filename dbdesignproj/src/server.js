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
var password="YOUR PASSWORD HERE;
var database="YOUR DATABASE HERE";

var con = sql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

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

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/credits/:movie', function(req, res) {
    //console.log(req.params.movie);
    req.params.movie=con.escape(req.params.movie);
    var query = `SELECT * FROM Credit c ` +
        `INNER JOIN Movie m ON c.movieId=m.movieId ` +
        `INNER JOIN Professional p ON p.personId=c.personId ` +
        `WHERE Name=${req.params.movie}`;
    con.query(query,
        function(err, results) {
            if (err) {
                console.log(err);
                res.send("Error");
            }
            var movieid = -1;
            var nestedResults = [];
            for(var i = 0; i < results.length; i++) {
                if(results[i].movieId==movieid) {
                    nestedResults[nestedResults.length-1].credits.push(results[i]);
                }
                else {
                    var credits=[{"firstName": results[i].firstName, "lastName": results[i].lastName,
                        "picture":results[i].picture, "dob": results[i].dob, "role": results[i].role}];
                    var movie={"role":results[i].role, "name": results[i].name,
                        "releaseDate": results[i].releaseDate, "coverPicture": results[i].coverPicture,
                        "credits": credits};
                    nestedResults.push(movie);
                    movieid=results[i].movieId;
                }
            }
            res.send(nestedResults);
    });
});

app.post('/new_user/:first/:last/:addr/:city/:country/:zip/:email/:password/:pic/',
    function(req, res) {
        req.params.first=con.escape(req.params.first);
        req.params.last=con.escape(req.params.last);
        req.params.addr=con.escape(req.params.addr);
        req.params.city=con.escape(req.params.city);
        req.params.state=con.escape(req.params.state);
        req.params.country=con.escape(req.params.country);
        req.params.zip=con.escape(req.params.zip);
        req.params.email=con.escape(req.params.email);
        req.params.password=con.escape(req.params.password);
        req.params.pic=con.escape(req.params.pic);
        var query=`INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, ` +
            `country, email, password, profilePicture) VALUES (${req.params.first}, ${req.params.last}, ` +
            `${req.params.addr}, ${req.params.city}, ${req.params.country},` +
            `${req.params.zip}, ${req.params.email}, ${req.params.password}, ${req.params.pic})`;
    con.query(query, function(err, result) {
        if (err) {
            console.log(err);
            res.send({stat:"Error"})
        }
        else res.send({stat:'Success'});
    })
});



app.post('/loved/:movieid/:userid', function(req, res) {
    req.params.movieid=con.escape(req.params.movieid);
    req.params.userid=con.escape(req.params.userid);
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


app.get('/credit/:role/:personName/:movieName', function(req, res) {
    req.params.role=con.escape(req.params.role);
    req.params.personName=con.escape(req.params.personName);
    req.params.movieName=con.escape(req.params.movieName);
    var personId=-1;
    getPersonId(req.params.personName, res).then(function(done) {
        personId=done;
    });
    var movieId=-1;
    getMovieId(req.params.movieName, res).then(function(done) {
        movieId=done;
    });
    setTimeout(function() {
        console.log(personId);
        var query=`INSERT INTO Credit (role, personid, movieid)
        VALUES (${req.params.role}, ${personId}, ${movieId})`;
        console.log(query);
        con.query(query, function(err, results) {
            if (err) {
                console.log(err);
                res.send("Error");
            }
            else res.send('Success');
        })
    }, 300);
});

function getMovieId(name, res) {
    var query = `SELECT movieId from Movie WHERE name=${name}`;
    var prom = new Promise(function(resolve, reject) {
        con.query(query, function(err, results) {
            if (err) {
                console.log(err);
                resolve("Error");
            }
            else if (results.length == 0) {
                res.send("Movie name doesn't exist");
                resolve(null);
            }
            else {
                console.log("here");
                resolve(results[0].movieId);
            }
        });
    });
    return prom;
}

function getPersonId(name, res) {
    name = name.replace("'", "");
    name = name.split(" ");
    var firstName=name[0];
    var lastName=name[1];
    lastName=lastName.replace("'", "");
    var query = `SELECT personId from Professional ` +
        `WHERE firstName='${firstName}' AND lastName='${lastName}'`;
    var prom = new Promise(function(resolve, reject) {
        con.query(query, function(err, results) {
            if (err) {
                console.log(err);
                resolve("Error");
            }
            else if (results.length == 0) {
                res.send("Person name doesn't exist");
                resolve(null);
            }
            else {
                console.log("here");
                resolve(results[0].personId);
            }
        });
    });
    return prom;
}



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
     else res.send(results);  })

});



app.get('/movies/:lastName', function(req, res) {
    req.params.lastName=con.escape(req.params.lastName);
    var query = `SELECT m.name AS movieName, m.coverPicture AS moviePicture, m.releaseDate AS releaseDate, m.movieId AS id ` +
        `FROM Movie m INNER JOIN Credit c ON m.movieId = c.movieId ` +
        `INNER JOIN Professional p ON c.personId = p.personId ` +
        `WHERE c.role = "Director" AND ` +
        `p.lastName=${req.params.lastName}`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })
});

app.get('/movie/:movieName', function(req, res) {
    req.params.movieName=con.escape(req.params.movieName);
    var query = `SELECT m.name AS movieName, m.coverPicture AS moviePicture, m.releaseDate AS releaseDate, m.movieId AS id ` +
        `FROM Movie m INNER JOIN Credit c ON m.movieId = c.movieId ` +
        `INNER JOIN Professional p ON c.personId = p.personId ` +
        `WHERE m.name=${req.params.movieName}`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })
});


app.get('/moviesPics/:userid', function(req, res) {
    req.params.userid=con.escape(req.params.userid);
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


//needs to specify that the movies were released this year
app.get('/moviesLoved/:userid', function(req, res) {
    req.params.userid=con.escape(req.params.userid);
    var thisYear=new Date();
    thisYear=thisYear.getFullYear();
    var query = `FROM SiteUser su INNER JOIN LovedMovies lm ON su.userId = lm.userID ` +
        `EXCEPT ` +
        `SELECT m.name AS movieName ` +
        `FROM SiteUser su INNER JOIN MovieOrder ON su.userId = mo.userId ` +
        `INNER JOIN Movie m ON m.movieId = mo.movieId ` +
        `WHERE YEAR(m.releaseDate)=${thisYear}`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error");
        }
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
    req.params.name=con.escape(req.params.name);
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

app.get('/allmovies/', function(req,res) {
    var query = `SELECT m.name AS movieName, m.releaseDate AS releaseDate, m.coverPicture, AS moviePicture, m.movieId AS id `
                `FROM Movie m`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })

});



app.get('/revenue/:genre', function(req, res) {
    var query='SELECT res.genre, revenue FROM ' +
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
    req.params.email=con.escape(req.params.email);
    req.params.password=con.escape(req.params.password);
    var query=`SELECT * FROM SiteUser su ` +
        `WHERE email=${req.params.email} AND ` +
        `password=${req.params.password}`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })
});

app.get('/theater/:city', function(req, res) {
    req.params.city=con.escape(req.params.city);
    var query=`SELECT * FROM TheaterVendor ` +
        `WHERE location=${req.params.city}`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error");
        }
        res.send(results);
    })
});

//REPORT QUERIES

//Find a user's top 3 movie studios that they've ordered from
app.get('/topStudios/:userid', function(req, res) {
    req.params.userid=con.escape(req.params.userid);
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
app.get('/favoriteGenre/:userid', function(req, res) {
    req.params.userid=con.escape(req.params.userid);
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
    var query= 'SELECT movieName, moviePicture, releaseDate, id FROM ' +
        '(SELECT m.name AS movieName, COUNT(*) AS movieCount, m.coverPicture AS moviePicture, m.releaseDate AS releaseDate, m.movieId AS id ' +
        'FROM LovedMovies lm INNER JOIN Movie m ON lm.movieId = m.movieId ' +
        'INNER JOIN MovieOrder mo ON mo.movieId = m.movieId ' +
        'INNER JOIN StreamingOrder so ON so.confirmationNumber = mo.confirmationNumber ' +
        'GROUP BY m.name, m.coverPicture, m.releaseDate, m.movieId ' +
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
    req.params.first=con.escape(req.params.first);
    req.params.last=con.escape(req.params.last);
    var query = `SELECT movieName, moviePicture, releaseDate, id FROM ` +
        `(SELECT m.Name AS movieName, SUM(mo.dollarAmount) AS revenue, m.coverPicture AS moviePicture, m.releaseDate AS releaseDate, m.movieId AS id ` +
        `FROM Movie m INNER JOIN Credit c ON m.movieId = c.creditId ` +
        `INNER JOIN MovieOrder mo ON mo.movieId = m.movieId ` +
        `INNER JOIN Professional p ON p.personId = c.personId ` +
        `WHERE c.role = "Director" AND ` +
        `p.firstname = ${req.params.first} ` +
        `AND p.lastname = ${req.params.last} ` +
        `GROUP BY m.name, m.coverPicture, m.releaseDate, m.movieId ` +
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
app.get('/yearBoxOfficeHit/:year', function(req, res) {
    req.params.year=con.escape(req.params.year);
    var query = `SELECT movieName, moviePicture, releaseDate, id  FROM ` +
        `(SELECT m.Name AS movieName, SUM(mo.dollarAmount) AS revenue, m.coverPicture AS moviePicture, m.releaseDate AS releaseDate, m.movieId AS id ` +
        `FROM Movie m INNER JOIN MovieOrder mo ON m.movieId = mo.movieId ` +
        `INNER JOIN TheaterOrder tho ON mo.confirmationNumber = tho.confirmationNumber ` +
	        `WHERE YEAR(m.releaseDate) = ${req.params.year} ` +
            `GROUP BY m.name, m.coverPicture, m.releaseDate, m.movieId ` +
	        `ORDER BY revenue DESC) res;`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })
});
