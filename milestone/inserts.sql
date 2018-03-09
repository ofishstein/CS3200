INSERT INTO Professional (firstName, lastName, picture, dob) 
VALUES("Joseph", "Wood", "pic.jpg", "1995-05-26");

INSERT INTO Professional (firstName, lastName, picture, dob) 
VALUES("John", "Smith", "insta.jpg", "1995-12-25");

INSERT INTO Professional (firstName, lastName, picture, dob) 
VALUES("Sara", "Jones", "fb.jpg", "1998-08-12");

INSERT INTO Professional (firstName, lastName, picture, dob) 
VALUES("Ann", "Williams", "twitter.jpg", "2010-02-28");

INSERT INTO Professional (firstName, lastName, picture, dob) 
VALUES("Kayla", "Davis", "google.jpg", "1952-04-01");

INSERT INTO Movie (name, genre, releaseDate, studio, coverPicture)
VALUES("The Incredibles", "Action", "2004-11-05", "Pixar", "incredibles.jpg");

INSERT INTO Movie (name, genre, releaseDate, studio, coverPicture)
VALUES("Finding Nemo", "Adventure", "2003-05-30", "Pixar", "finding_nemo.jpg");

INSERT INTO Movie (name, genre, releaseDate, studio, coverPicture)
VALUES("Lion King", "Animation", "1994-07-19", "Disney", "lion_king.jpg");

INSERT INTO Movie (name, genre, releaseDate, studio, coverPicture)
VALUES("Deadpool", "Action", "2016-02-12", "Fox", "deadpool.jpg");

INSERT INTO Movie (name, genre, releaseDate, studio, coverPicture)
VALUES("The Dark Knight", "Action", "2008-07-18", "Warner Bros.", "the_dark_knight.jpg");

INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password)
VALUES ("Jeff", "Johnson", "112 Huntington Ave", "Boston", "02120", "USA", "jeff@gmail.com", "p@$$w0rd");

INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password)
VALUES ("Max", "Brown", "212 Columbus Ave", "Boston", "02115", "USA", "max@hotmail.com", "123456");

INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password)
VALUES ("Rebecca", "Miller", "178 Tremont Ave", "San Francisco", "45987", "USA", "b3cca@comcast.net", "rebecca");

INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password)
VALUES ("Kelly", "Davis", "25256 Vista Sorrento Parkway", "San Diego", "92130", "USA", "surfergirl@gmail.com", "iluvsurfing");

INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password)
VALUES ("Mariel", "Wilson", "450 Orland Park Road", "Chicago", "12670", "USA", "windycity@gmail.com", "blackhawks");

INSERT INTO Vendor (name)
VALUES ("Regal");

INSERT INTO Vendor (name)
VALUES ("Netflix");

INSERT INTO Vendor (name)
VALUES ("Hulu");

INSERT INTO Vendor (name)
VALUES ("AMC");

INSERT INTO Vendor (name)
VALUES ("ABC");

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




INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("1", "mr_incredible.jpg", "Mr. Incredible");

INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("2", "nemo.jpg", "nemo");

INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("3", "buzz.jpg", "Buzz Lightyear");

INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("4", "deadpool.jpg", "Deadpool");

INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("5", "batman.jpg", "Batman");



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




INSERT INTO StreamingVendor(vendorId, url)
VALUES (2, "www.netflix.com");

INSERT INTO StreamingVendor(vendorId, url)
VALUES (3, "www.hulu.com");

INSERT INTO StreamingVendor(vendorId, url)
VALUES (5, "www.abc.com");


INSERT INTO TheaterVendor(vendorId, location)
VALUES (1, "Fenway");

INSERT INTO TheaterVendor(vendorId, location)
VALUES (4, "Dallas");


INSERT INTO MovieOrder(orderTime, vendorId, userId, movieId, dollarAmount)
VALUES ("2018-02-28 13:15:32", 1, 2, 4, 27);

INSERT INTO MovieOrder(orderTime, vendorId, userId, movieId, dollarAmount)
VALUES ("2003-02-23 12:25:26", 1, 2, 4, 27);

INSERT INTO MovieOrder(orderTime, vendorId, userId, movieId, dollarAmount)
VALUES ("2017-09-13 02:00:48", 4, 3, 5, 27);

INSERT INTO MovieOrder(orderTime, vendorId, userId, movieId, dollarAmount)
VALUES ("2018-01-15 18:49:23", 1, 2, 4, 27);

INSERT INTO MovieOrder(orderTime, vendorId, userId, movieId, dollarAmount)
VALUES ("2018-01-01 00:00:01", 5, 1, 3, 27);

INSERT INTO MovieOrder(orderTime, vendorId, userId, movieId, dollarAmount)
VALUES ("2013-09-04 03:04:05", 1, 2, 4, 27);

INSERT INTO MovieOrder(orderTime, vendorId, userId, movieId, dollarAmount)
VALUES ("2014-08-30 20:37:17", 2, 5, 1, 27);

INSERT INTO MovieOrder(orderTime, vendorId, userId, movieId, dollarAmount)
VALUES ("2011-6-30 23:59:59", 1, 2, 4, 27);

INSERT INTO MovieOrder(orderTime, vendorId, userId, movieId, dollarAmount)
VALUES ("2002-05-26 22:23:24", 3, 4, 2, 27);


INSERT INTO StreamingOrder(orderId, expiration)
VALUES (1, "2018-04-21 11:16:28");

INSERT INTO StreamingOrder(orderId, expiration)
VALUES (3, "2018-02-27 08:19:43");

INSERT INTO StreamingOrder(orderId, expiration)
VALUES (5, "2018-10-31 05:21:25");

INSERT INTO StreamingOrder(orderId, expiration)
VALUES (7, "2016-12-25 15:36:52");

INSERT INTO StreamingOrder(orderId, expiration)
VALUES (9, "2005-07-04 17:55:20");


INSERT INTO TheaterOrder(orderId, ticketCount)
VALUES (2, 1);

INSERT INTO TheaterOrder(orderId, ticketCount)
VALUES (4, 6);

INSERT INTO TheaterOrder(orderId, ticketCount)
VALUES (6, 2);

INSERT INTO TheaterOrder(orderId, ticketCount)
VALUES (8, 4);


INSERT INTO TheaterOrderSeats(orderId, seatId)
VALUES (2, "B8"); # might want something here about theater numner and seat

INSERT INTO TheaterOrderSeats(orderId, seatId)
VALUES (4, "C2");

INSERT INTO TheaterOrderSeats(orderId, seatId)
VALUES (4, "C3");

INSERT INTO TheaterOrderSeats(orderId, seatId)
VALUES (4, "C1");

INSERT INTO TheaterOrderSeats(orderId, seatId)
VALUES (4, "C4");

INSERT INTO TheaterOrderSeats(orderId, seatId)
VALUES (4, "C5");

INSERT INTO TheaterOrderSeats(orderId, seatId)
VALUES (4, "C6");

INSERT INTO TheaterOrderSeats(orderId, seatId)
VALUES (6, "G10");

INSERT INTO TheaterOrderSeats(orderId, seatId)
VALUES (6, "G09");

INSERT INTO TheaterOrderSeats(orderId, seatId)
VALUES (8, "E5");

INSERT INTO TheaterOrderSeats(orderId, seatId)
VALUES (8, "E6");

INSERT INTO TheaterOrderSeats(orderId, seatId)
VALUES (8, "B3");

INSERT INTO TheaterOrderSeats(orderId, seatId)
VALUES (8, "B4");


INSERT INTO MoviePictures(movieId, picture)
VALUES (1, "dash.png");

INSERT INTO MoviePictures(movieId, picture)
VALUES (2, "nemo.png");

INSERT INTO MoviePictures(movieId, picture)
VALUES (2, "dora.png");

INSERT INTO MoviePictures(movieId, picture)
VALUES (3, "buzz.png");

INSERT INTO MoviePictures(movieId, picture)
VALUES (4, "deadpool.png");

INSERT INTO MoviePictures(movieId, picture)
VALUES (5, "harvey.png");

INSERT INTO MoviePictures(movieId, picture)
VALUES (5, "commissionergorddon.png");

INSERT INTO MoviePictures(movieId, picture)
VALUES (5, "batman.png");




