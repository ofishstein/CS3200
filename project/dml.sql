/* Inserts for Professional */
INSERT INTO Professional (firstName, lastName, picture, dob) 
VALUES("Joseph", "Wood", "joseph.jpg", "1995-05-26");

INSERT INTO Professional (firstName, lastName, picture, dob) 
VALUES("John", "Smith", "john.jpg", "1995-12-25");

INSERT INTO Professional (firstName, lastName, picture, dob) 
VALUES("Sara", "Jones", "sara.jpg", "1998-08-12");

INSERT INTO Professional (firstName, lastName, picture, dob) 
VALUES("Ann", "Williams", "ann.jpg", "2010-02-28");

INSERT INTO Professional (firstName, lastName, picture, dob) 
VALUES("Kayla", "Davis", "kayla.jpg", "1952-04-01");

INSERT INTO Professional (firstName, lastName, picture, dob) 
VALUES("James", "Mccord", "james.jpg", "1901-06-10");

INSERT INTO Professional (firstName, lastName, picture, dob) 
VALUES("Cara", "Rosenblum", "cara.jpg", "2004-03-05");

INSERT INTO Professional (firstName, lastName, picture, dob) 
VALUES("Maxwell", "Kuzma", "maxwell.jpg", "2003-09-22");

INSERT INTO Professional (firstName, lastName, picture, dob) 
VALUES("Brigid", "Greaney", "brigid.jpg", "2000-06-30");

INSERT INTO Professional (firstName, lastName, picture, dob) 
VALUES("Duane", "Swift", "duane.jpg", "1997-12-18");

/* Inserts for Genre */
INSERT INTO Genre (genreName)
VALUES("Action");

INSERT INTO Genre (genreName)
VALUES("Adventure");

INSERT INTO Genre (genreName)
VALUES("Animation");

INSERT INTO Genre (genreName)
VALUES("Drama");

INSERT INTO Genre (genreName)
VALUES("Comedy");

INSERT INTO Genre (genreName)
VALUES("Thriller");

INSERT INTO Genre (genreName)
VALUES("Romance");

INSERT INTO Genre (genreName)
VALUES("Horror");

INSERT INTO Genre (genreName)
VALUES("Childrens");

INSERT INTO Genre (genreName)
VALUES("Documentary");

/* Inserts for Studio */
INSERT INTO Studio (studioName)
VALUES("Pixar");

INSERT INTO Studio (studioName)
VALUES("Disney");

INSERT INTO Studio (studioName)
VALUES("Fox");

INSERT INTO Studio (studioName)
VALUES("Warner Bros.");

INSERT INTO Studio (studioName)
VALUES("Paramount");

INSERT INTO Studio (studioName)
VALUES("Universal");

INSERT INTO Studio (studioName)
VALUES("IFC");

INSERT INTO Studio (studioName)
VALUES("Viacom");

INSERT INTO Studio (studioName)
VALUES("Sony");

INSERT INTO Studio (studioName)
VALUES("Columbia");

/* Inserts for Movie */
INSERT INTO Movie (name, genreId, releaseDate, studioId, coverPicture)
VALUES("The Incredibles", 1, "2004-11-05", 1, "https://images-na.ssl-images-amazon.com/images/I/71uRfcuYBXL._SL1500_.jpg");

INSERT INTO Movie (name, genreId, releaseDate, studioId, coverPicture)
VALUES("Finding Nemo", 2, "2003-05-30", 1, "https://vignette.wikia.nocookie.net/disney/images/7/7f/Finding_Nemo_-_Poster.png/revision/latest?cb=20140902165636");

INSERT INTO Movie (name, genreId, releaseDate, studioId, coverPicture)
VALUES("Lion King", 3, "1994-07-19", 2, "https://vignette.wikia.nocookie.net/disney/images/c/cb/The_Lion_King_Textless_poster_1.jpg/revision/latest?cb=20140810104158");

INSERT INTO Movie (name, genreId, releaseDate, studioId, coverPicture)
VALUES("Deadpool", 1, "2016-02-12", 3, "https://i.pinimg.com/originals/27/aa/bf/27aabf4d95928096dd4236ab0400f71d.jpg");

INSERT INTO Movie (name, genreId, releaseDate, studioId, coverPicture)
VALUES("The Dark Knight", 1, "2008-07-18", 4, "https://i.pinimg.com/originals/d6/57/a4/d657a48442d85023b6960c1cd1e0464e.jpg");

INSERT INTO Movie (name, genreId, releaseDate, studioId, coverPicture)
VALUES("Titanic", 4, "1997-12-19", 3, "https://www.onthisday.com/images/articles/titanic-the-movie.jpg");

INSERT INTO Movie (name, genreId, releaseDate, studioId, coverPicture)
VALUES("Interstellar", 4, "2014-10-26", 5, "https://i.pinimg.com/originals/2d/5e/89/2d5e8906b202621c627fcfecaf8fe7de.jpg");

INSERT INTO Movie (name, genreId, releaseDate, studioId, coverPicture)
VALUES("Despicable Me", 5, "2010-07-09", 6, "https://vignette.wikia.nocookie.net/transcripts/images/1/16/Universal%27s_Despicable_Me_-_iTunes_Movie_Poster.jpg/revision/latest?cb=20170218042512");

INSERT INTO Movie (name, genreId, releaseDate, studioId, coverPicture)
VALUES("Jaws", 6, "1975-06-20", 6, "https://vignette.wikia.nocookie.net/jaws/images/d/da/Jaws-movie-poster.jpg/revision/latest?cb=20131015071208");

INSERT INTO Movie (name, genreId, releaseDate, studioId, coverPicture)
VALUES("Casablanca", 7, "1943-01-23", 4, "https://vignette.wikia.nocookie.net/moviedatabase/images/e/ed/Casablanca_%281942%29.jpg/revision/latest?cb=20140203153550");

/* Inserts for SiteUser */
INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password, profilePicture)
VALUES ("Jeff", "Johnson", "112 Huntington Ave", "Boston", "02120", "USA", "jeff@gmail.com", "p@$$w0rd", "http://anncurtis.ie/wp-content/uploads/2018/02/male-placeholder.jpg");

INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password, profilePicture )
VALUES ("Max", "Brown", "212 Columbus Ave", "Boston", "02115", "USA", "max@hotmail.com", "123456", "http://anncurtis.ie/wp-content/uploads/2018/02/male-placeholder.jpg");

INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password, profilePicture )
VALUES ("Rebecca", "Miller", "178 Tremont Ave", "San Francisco", "45987", "USA", "b3cca@comcast.net", "rebecca", "http://anncurtis.ie/wp-content/uploads/2018/02/male-placeholder.jpg");

INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password, profilePicture )
VALUES ("Kelly", "Davis", "25256 Vista Sorrento Parkway", "San Diego", "92130", "USA", "surfergirl@gmail.com", "iluvsurfing", "http://anncurtis.ie/wp-content/uploads/2018/02/male-placeholder.jpg");

INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password, profilePicture )
VALUES ("Mariel", "Wilson", "450 Orland Park Road", "Chicago", "12670", "USA", "windycity@gmail.com", "blackhawks", "http://anncurtis.ie/wp-content/uploads/2018/02/male-placeholder.jpg");

INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password, profilePicture )
VALUES ("Jim", "Gormley", "1000 Rodeo Drive", "Beverly Hills", "90212", "USA", "jim@gmail.com", "654321", "http://anncurtis.ie/wp-content/uploads/2018/02/male-placeholder.jpg");

INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password, profilePicture )
VALUES ("Emily", "Madaras", "361A Old Finch Ave", "Toronto", "M1B 5K7", "Canada", "emily@northeastern.edu", "applefangirl", "http://anncurtis.ie/wp-content/uploads/2018/02/male-placeholder.jpg");

INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password, profilePicture )
VALUES ("Zac", "Who", "1-5-2 Higashi-Shimbashi", "Tokyo", "105-7123", "Japan", "zac@intuit.com", "gfszdfeaffasd", "http://anncurtis.ie/wp-content/uploads/2018/02/male-placeholder.jpg");

INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password, profilePicture )
VALUES ("Julie", "Frankel", "Rua do Farol 2", "Azoia", "2740-029", "Portugal", "julie@gmail.com", "fido0210", "http://anncurtis.ie/wp-content/uploads/2018/02/male-placeholder.jpg");

INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password, profilePicture )
VALUES ("Savannah", "Lawrence", "15 Royal Mint St.", "London", "E1 8LG", "UK", "savannah@gmail.com", "football", "http://anncurtis.ie/wp-content/uploads/2018/02/male-placeholder.jpg");

/* Inserts for SiteUserPhone */
INSERT INTO SiteUserPhone (userId, phoneNumber)
VALUES (1, "973-525-2625");

INSERT INTO SiteUserPhone (userId, phoneNumber)
VALUES (2, "666-535-8910");

INSERT INTO SiteUserPhone (userId, phoneNumber)
VALUES (3, "890-526-8873");

INSERT INTO SiteUserPhone (userId, phoneNumber)
VALUES (4, "973-525-2625");

INSERT INTO SiteUserPhone (userId, phoneNumber)
VALUES (5, "862-525-2625");

INSERT INTO SiteUserPhone (userId, phoneNumber)
VALUES (6, "973-525-2625");

INSERT INTO SiteUserPhone (userId, phoneNumber)
VALUES (7, "973-524-2825");

INSERT INTO SiteUserPhone (userId, phoneNumber)
VALUES (8, "333-525-2222");

INSERT INTO SiteUserPhone (userId, phoneNumber)
VALUES (9, "763-295-2511");

INSERT INTO SiteUserPhone (userId, phoneNumber)
VALUES (10, "889-555-4525");

/* Inserts for Vendor */
INSERT INTO Vendor (name)
VALUES ("Netflix");

INSERT INTO Vendor (name)
VALUES ("Hulu");

INSERT INTO Vendor (name)
VALUES ("ABC");

INSERT INTO Vendor (name)
VALUES ("Bravo");

INSERT INTO Vendor (name)
VALUES ("FX");

INSERT INTO Vendor (name)
VALUES ("CBS");

INSERT INTO Vendor (name)
VALUES ("TBS");

INSERT INTO Vendor (name)
VALUES ("Disney");

INSERT INTO Vendor (name)
VALUES ("E");

INSERT INTO Vendor (name)
VALUES ("ESPN");

INSERT INTO Vendor (name)
VALUES ("Regal");

INSERT INTO Vendor (name)
VALUES ("AMC");

INSERT INTO Vendor (name)
VALUES ("Cinemark");

INSERT INTO Vendor (name)
VALUES ("EPIC");

INSERT INTO Vendor (name)
VALUES ("ArcLight");

INSERT INTO Vendor (name)
VALUES ("Regency");

INSERT INTO Vendor (name)
VALUES ("Reel");

INSERT INTO Vendor (name)
VALUES ("Tristone");

INSERT INTO Vendor (name)
VALUES ("MJR");

INSERT INTO Vendor (name)
VALUES ("Marquee");

/* Inserts for Credit */
INSERT INTO Credit (role, personId, movieId)
VALUES("Actor", 1, 5);

INSERT INTO Credit (role, personId, movieId)
VALUES("Producer", 2, 4);

INSERT INTO Credit (role, personId, movieId)
VALUES("Actress", 3, 2);

INSERT INTO Credit (role, personId, movieId)
VALUES("Director", 4, 3);

INSERT INTO Credit (role, personId, movieId)
VALUES("Stunt Double", 5, 1);

INSERT INTO Credit (role, personId, movieId)
VALUES("Animation Director", 6, 8);

INSERT INTO Credit (role, personId, movieId)
VALUES("Film Editor", 7, 10);

INSERT INTO Credit (role, personId, movieId)
VALUES("Compositor", 8, 9);

INSERT INTO Credit (role, personId, movieId)
VALUES("Matte Painter", 9, 6);

INSERT INTO Credit (role, personId, movieId)
VALUES("Recording Engineer", 10, 7);

/* Inserts for Credit Character */
INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("1", "https://vignette.wikia.nocookie.net/disney/images/2/21/The-Incredibles-_Bob_Parr.jpg/revision/latest?cb=20160206172921", "Mr. Incredible");

INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("2", "https://pbs.twimg.com/profile_images/458795602143244288/LYcZFWDT.jpeg", "nemo");

INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("3", "https://vignette.wikia.nocookie.net/pixar/images/3/3b/Buzz_Lightyear_running.jpg/revision/latest?cb=20111208020514", "Buzz Lightyear");

INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("4", "http://www.canyon-news.com/wp-content/uploads/2016/02/Deadpool.jpg", "Deadpool");

INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("5", "https://i.wpimg.pl/O/413x600/i.wp.pl/a/f/film/033/31/02/0320231.jpg", "Batman");

INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("6", "https://i.pinimg.com/originals/96/3e/80/963e800ee0cc96206371084c5a254473.jpg", "Jack Dawson");

INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("7", "https://www.samishleather.com/wp-content/uploads/2016/09/Jessica-Chastain-Interstellar-Murph-Brown-Jacket-450x600.jpg", "Murph");

INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("8", "https://img.etsystatic.com/il/a0df63/839843603/il_fullxfull.839843603_eysi.jpg?version=1", "Gru");

INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("9", "https://i.pinimg.com/originals/c9/1a/6f/c91a6fa8526f046babd7ba982f6f9303.png", "Matt Hoopper");

INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("10", "http://www.geewhizcustoms.com/assets/images/179-rick-blaine-tuxedo-from-casablanca/._mini1100x0/18671606_1341262639289341_2888713432837167591_o.jpgoh0859a892a810edeb2f9d49ca78a20eadoe5a033ace.jpg", "Rick Blaine");

/* Inserts for Loved Movies */
INSERT INTO LovedMovies (movieId, userId)
VALUES (1, 3);

INSERT INTO LovedMovies (movieId, userId)
VALUES (2, 4);

INSERT INTO LovedMovies (movieId, userId)
VALUES (3, 5);

INSERT INTO LovedMovies (movieId, userId)
VALUES (4, 1);

INSERT INTO LovedMovies (movieId, userId)
VALUES (5, 2);

INSERT INTO LovedMovies (movieId, userId)
VALUES (6, 6);

INSERT INTO LovedMovies (movieId, userId)
VALUES (7, 8);

INSERT INTO LovedMovies (movieId, userId)
VALUES (8, 9);

INSERT INTO LovedMovies (movieId, userId)
VALUES (9, 10);

INSERT INTO LovedMovies (movieId, userId)
VALUES (10, 7);

/* Inserts for StreamingVendor */
INSERT INTO StreamingVendor(vendorId, url)
VALUES (1, "www.netflix.com");

INSERT INTO StreamingVendor(vendorId, url)
VALUES (2, "www.hulu.com");

INSERT INTO StreamingVendor(vendorId, url)
VALUES (3, "www.abc.com");

INSERT INTO StreamingVendor(vendorId, url)
VALUES (4, "www.bravo.com");

INSERT INTO StreamingVendor(vendorId, url)
VALUES (5, "www.fx.com");

INSERT INTO StreamingVendor(vendorId, url)
VALUES (6, "www.cbs.com");

INSERT INTO StreamingVendor(vendorId, url)
VALUES (7, "www.tbs.com");

INSERT INTO StreamingVendor(vendorId, url)
VALUES (8, "www.disney.com");

INSERT INTO StreamingVendor(vendorId, url)
VALUES (9, "www.e.com");

INSERT INTO StreamingVendor(vendorId, url)
VALUES (10, "www.espn.com");

/* Inserts for Theater Vendor */
INSERT INTO TheaterVendor(vendorId, location)
VALUES (11, "Fenway");

INSERT INTO TheaterVendor(vendorId, location)
VALUES (12, "San Francisco");

INSERT INTO TheaterVendor(vendorId, location)
VALUES (13, "Dallas");

INSERT INTO TheaterVendor(vendorId, location)
VALUES (14, "San Diego");

INSERT INTO TheaterVendor(vendorId, location)
VALUES (15, "Los Angeles");

INSERT INTO TheaterVendor(vendorId, location)
VALUES (16, "Chicago");

INSERT INTO TheaterVendor(vendorId, location)
VALUES (17, "Houston");

INSERT INTO TheaterVendor(vendorId, location)
VALUES (18, "Orlando");

INSERT INTO TheaterVendor(vendorId, location)
VALUES (19, "Charleston");

INSERT INTO TheaterVendor(vendorId, location)
VALUES (20, "New York");

/* Inserts for Movie Order */
INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2018-02-28 13:15:32", 0.0, 1, 9, 1);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2003-02-23 12:25:26", 0.0, 2, 1, 4);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2017-09-13 02:00:48", 5.0, 3, 10, 5);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2016-12-25 15:36:52", 4.99, 4, 5, 4);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2005-07-04 17:55:20", 5.99, 5, 3, 3);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2013-09-04 03:04:05", 0.0, 6, 2, 6);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2012-04-20 14:18:31", 0.0, 7, 7, 9);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2011-06-30 23:59:59", 0.0, 8, 4, 5);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2002-05-26 22:23:24", 6.0, 9, 8, 7);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2008-01-17 21:14:28", 0.0, 10, 3, 2);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2002-05-26 22:23:24", 10.0, 11, 9, 2);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2011-08-02 19:19:19", 66.0, 12, 2, 1);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2007-03-20 14:27:21", 18.99, 13, 6, 9);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2002-09-21 11:57:56", 45.0, 14, 5, 8);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2001-08-09 20:32:49", 48.0, 15, 4, 7);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2012-10-10 07:26:28", 8.0, 16, 10, 6);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2018-03-08 09:41:29", 53.0, 17, 7, 8);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2018-02-26 11:32:42", 38.0, 18, 6, 10);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2015-11-21 03:05:07", 15.0, 19, 1, 10);

INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2016-10-31 04:06:08", 40.0, 20, 8, 1);

/* Inserts for Theater Order */
INSERT INTO TheaterOrder(confirmationNumber, ticketCount)
VALUES (11, 1);

INSERT INTO TheaterOrder(confirmationNumber, ticketCount)
VALUES (12, 6);

INSERT INTO TheaterOrder(confirmationNumber, ticketCount)
VALUES (13, 2);

INSERT INTO TheaterOrder(confirmationNumber, ticketCount)
VALUES (14, 4);

INSERT INTO TheaterOrder(confirmationNumber, ticketCount)
VALUES (15, 4);

INSERT INTO TheaterOrder(confirmationNumber, ticketCount)
VALUES (16, 1);

INSERT INTO TheaterOrder(confirmationNumber, ticketCount)
VALUES (17, 5);

INSERT INTO TheaterOrder(confirmationNumber, ticketCount)
VALUES (18, 3);

INSERT INTO TheaterOrder(confirmationNumber, ticketCount)
VALUES (19, 1);

INSERT INTO TheaterOrder(confirmationNumber, ticketCount)
VALUES (20, 2);

/* Inserts for Streaming Order */
INSERT INTO StreamingOrder(confirmationNumber, expiration)
VALUES (1, "2018-04-21 11:16:28");

INSERT INTO StreamingOrder(confirmationNumber, expiration)
VALUES (2, "2018-02-27 08:19:43");

INSERT INTO StreamingOrder(confirmationNumber, expiration)
VALUES (3, "2018-10-31 05:21:25");

INSERT INTO StreamingOrder(confirmationNumber, expiration)
VALUES (4, "2018-01-15 18:49:23");

INSERT INTO StreamingOrder(confirmationNumber, expiration)
VALUES (5, "2018-01-01 00:00:01");

INSERT INTO StreamingOrder(confirmationNumber, expiration)
VALUES (6, "2017-07-01 12:27:21");

INSERT INTO StreamingOrder(confirmationNumber, expiration)
VALUES (7, "2014-08-30 20:37:17");

INSERT INTO StreamingOrder(confirmationNumber, expiration)
VALUES (8, "2015-02-13 02:48:12");

INSERT INTO StreamingOrder(confirmationNumber, expiration)
VALUES (9, "2010-05-21 06:42:51");

INSERT INTO StreamingOrder(confirmationNumber, expiration)
VALUES (10, "2009-11-30 23:37:10");

/* Inserts for Movie Pictures */
INSERT INTO MoviePictures(movieId, picture)
VALUES (1, "https://vignette.wikia.nocookie.net/disney/images/2/20/Dash.jpg/revision/latest?cb=20170127100549");

INSERT INTO MoviePictures(movieId, picture)
VALUES (2, "https://pbs.twimg.com/profile_images/458795602143244288/LYcZFWDT.jpeg");

INSERT INTO MoviePictures(movieId, picture)
VALUES (2, "https://vignette.wikia.nocookie.net/pixar/images/a/af/Dory_FD.jpg/revision/latest?cb=20170807222556");

INSERT INTO MoviePictures(movieId, picture)
VALUES (3, "https://vignette.wikia.nocookie.net/pixar/images/3/3b/Buzz_Lightyear_running.jpg/revision/latest?cb=20111208020514");

INSERT INTO MoviePictures(movieId, picture)
VALUES (4, "http://www.canyon-news.com/wp-content/uploads/2016/02/Deadpool.jpg");

INSERT INTO MoviePictures(movieId, picture)
VALUES (5, "http://cdn3-www.mandatory.com/assets/uploads/2017/09/dent.jpg");

INSERT INTO MoviePictures(movieId, picture)
VALUES (5, "https://vignette.wikia.nocookie.net/batman/images/c/ca/Batman_photos_oldman.jpg/revision/latest?cb=20080321214518");

INSERT INTO MoviePictures(movieId, picture)
VALUES (6, "https://i.pinimg.com/originals/96/3e/80/963e800ee0cc96206371084c5a254473.jpg");

INSERT INTO MoviePictures(movieId, picture)
VALUES (7, "https://kpbs.media.clients.ellingtoncms.com/img/events/2016/casablanca_3_t400.jpg?462b9d6f90d959445a9a4ed322227662267dc65b");

INSERT INTO MoviePictures(movieId, picture)
VALUES (8, "https://img.etsystatic.com/il/a0df63/839843603/il_fullxfull.839843603_eysi.jpg?version=1");

INSERT INTO MoviePictures(movieId, picture)
VALUES (9, "https://i.pinimg.com/originals/c9/1a/6f/c91a6fa8526f046babd7ba982f6f9303.png");

INSERT INTO MoviePictures(movieId, picture)
VALUES (10, "http://www.geewhizcustoms.com/assets/images/179-rick-blaine-tuxedo-from-casablanca/._mini1100x0/18671606_1341262639289341_2888713432837167591_o.jpgoh0859a892a810edeb2f9d49ca78a20eadoe5a033ace.jpg");




