var express = require('express'),
    sql = require('mysql');

// run express app
var app = express();

// base route
app.get('/', function(req, res) {
    res.send('Hello World!');
});

// what port requests wil be passed through
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

// database information, will need to be updated with personal details
var host="localhost";
var user="root";
var password="DLkmmAY!!!";
var database="dbdesignproject";

// connection structure for mysql database
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

// connect to the database
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// get all credits for a given movie
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
            // this nests credits under each movie, rather than every credit given their own results
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

// add a new user given various information about the user but most importantly the email and password
// for login purposes
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

// love a movie given a movie and a user
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

// credit a professional for a movie with their role
app.post('/credit/:role/:personName/:movieName', function(req, res) {
    req.params.role=con.escape(req.params.role);
    req.params.personName=con.escape(req.params.personName);
    req.params.movieName=con.escape(req.params.movieName);
    var name = req.params.personName.split(" ");
    var firstName=name[0];
    firstName=firstName.slice(1, firstName.length);
    var lastName=name[1].slice(0, -1);
    var movieQuery=`SELECT movieId from Movie WHERE name=${req.params.movieName}; `;
    var personQuery=`SELECT personId from Professional ` +
        `WHERE firstName='${firstName}' AND lastName='${lastName}'; `;
    // needed to nest the queries
    // when queries were running one after another, rather than nesting
    // javascript wasn't waiting for execution to finish and thus variables
    // were undefined
    con.query(movieQuery, function(err, results) {
        if (err) {
            console.log(err);
            res.send({Stat:"Error"});
        }
        if (!results[0]) {
            res.send({Stat:"Error"});
        }
        // get movieId from result
        var movieId=results[0].movieId;
        con.query(personQuery, function(err, results) {
            if (err) {
                console.log(err);
                res.send({Stat:"Error"});
            }
            if (!results[0])
            {
                res.send({Stat:"Error"});
            }
            // get personId from result
            var personId=results[0].personId;
            var creditQuery=`INSERT INTO Credit (role, personid, movieid) ` +
                `VALUES (${req.params.role}, ${personId}, ${movieId})`;
            con.query(creditQuery, function(err, results) {
                if (err) {
                    console.log(err);
                    res.send({Stat:"Error"});
                }
                res.send({Stat:"Success"});
            });
        })
    })
});


// get all revenue from all movies
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


// get all movies directed by a Director with a given last name
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

// get all movies given a movieName
app.get('/movie/:movieName', function(req, res) {
    req.params.movieName=con.escape(req.params.movieName);
    var query = `SELECT m.name AS movieName, m.coverPicture AS moviePicture, m.releaseDate AS releaseDate, m.movieId AS id ` +
        `FROM Movie m ` +
        `WHERE m.name=${req.params.movieName}`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })
});

// get all movie pictures from a given user's movie orders
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


// get all movies a user loved that were released this year
app.get('/moviesLoved/:userid', function(req, res) {
    req.params.userid=con.escape(req.params.userid);
    var thisYear=new Date();
    thisYear=thisYear.getFullYear();
    var query = `SELECT m.name AS movieName, m.releaseDate AS releaseDate, m.coverPicture AS moviePicture, m.movieId AS id FROM ` +
        `SiteUser su INNER JOIN LovedMovies lm ON su.userId = lm.userId INNER JOIN Movie m ON lm.movieId = m.movieId ` + 
        `WHERE su.userId=${req.params.userid} AND lm.movieId NOT IN ` + 
        `(SELECT m.movieId AS movieName ` + 
        `FROM SiteUser su INNER JOIN MovieOrder mo ON su.userId = mo.userId ` + 
        `INNER JOIN Movie m ON m.movieId = mo.movieId ` + 
        `WHERE YEAR(m.releaseDate)=${thisYear});`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error");
        }
        console.log(results);
        res.send(results);
    })
});


// Get all movies in the database
app.get('/allmovies/', function(req,res) {
    var query = `SELECT m.name AS movieName, m.releaseDate AS releaseDate, m.coverPicture AS moviePicture, m.movieId AS id ` +
                `FROM Movie m`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        res.send(results);
    })

});


// Get revenue for all movies within a given genre
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

// See if there's a valid user with a given email and password combination-for login purposes
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

// Find a theater given a city
app.get('/theater/:city', function(req, res) {
    req.params.city=con.escape(req.params.city);
    var query=`SELECT * FROM TheaterVendor tv INNER JOIN Vendor v ON v.vendorId = tv.vendorId ` +
        `WHERE location=${req.params.city}`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error");
        }
        res.send(results);
    })
});

// Find an order given a movieId, userId, and a vendorId
app.get('/order/:movieId/:userId/:vendorId', function(req, res) {
    req.params.movieId=con.escape(req.params.movieId);
    req.params.userId=con.escape(req.params.userId);
    req.params.vendorId=con.escape(req.params.vendorId);
    var query = `SELECT * FROM ` +
        `MovieOrder ` +
        `WHERE movieId=${req.params.movieId} AND ` +
        `userId=${req.params.userId} AND ` +
        `vendorId=${req.params.vendorId};`;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error");
        }
        res.send(results);
    })
});

//REPORT QUERIES

//Find a given user's top 3 movie studios that they've ordered from
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

// Find a given user's favorite genre based on loved movies
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
            res.send("Error");
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


// Find a specific director's best selling films given their first and last name
app.get('/directorsBestSelling/:first/:last', function(req, res) {
    req.params.first=con.escape(req.params.first);
    req.params.last=con.escape(req.params.last);
    var query = `SELECT movieName, moviePicture, releaseDate, id FROM ` +
        `(SELECT m.Name AS movieName, SUM(mo.dollarAmount) AS revenue, m.coverPicture AS moviePicture, m.releaseDate AS releaseDate, m.movieId AS id ` +
        `FROM Movie m INNER JOIN Credit c ON m.movieId = c.movieId ` +
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

// Find a given year's box office hits
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
            res.send("Error");
        }
        res.send(results);
    })
});

/*
route for creating theater ticket orders that takes the cost of a single ticket,
vendorId, userId, and a movieId that corresponds to the theater the movie is seen at,
the user seeing the movie, and what movie they're seeing
 */
app.post('/theaterOrder/:dollarAmount/:vendorId/:userId/:movieId', function(req, res) {
    req.params.dollarAmount=con.escape(req.params.dollarAmount);
    req.params.movieId=con.escape(req.params.movieId);
    req.params.userId=con.escape(req.params.userId);
    req.params.vendorId=con.escape(req.params.vendorId);
    // get datetime and convert to mysql date formart
    // found this to help with the process: https://stackoverflow.com/questions/2280104/convert-javascript-to-date-object-to-mysql-date-format-yyyy-mm-dd/27315670

    var orderTime=new Date().toISOString().slice(0, 19).replace('T', ' ');
    var query = `INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId) ` +
        `VALUES ('${orderTime}', ${req.params.dollarAmount}, ${req.params.vendorId}, ` +
        `${req.params.userId}, ${req.params.movieId}); `;
    con.query(query, function(err, results) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        // get the confirmation id from the movie order insert so we can link it to theater order
        var confirmationNumber=results.insertId;
        var query = `INSERT INTO TheaterOrder(confirmationNumber, ticketCount) ` +
            `VALUES (${confirmationNumber}, 1);`;
        con.query(query, function(err, results) {
            if (err) {
                console.log(err);
                res.send("Error")
            }
            res.send(results);
        })
    });
});
