/* Required Task A */
INSERT INTO SiteUser (firstName, lastName, streetAddr, city, postalCode, country, email, password)
VALUES ("Jeff", "Johnson", "112 Huntington Ave", "Boston", "02120", "USA", "jeff@gmail.com", "p@$$w0rd");

/* Required Task B */
INSERT INTO LovedMovies (movieId, userId)
VALUES (1, 3);

/* Required Task C */
/* First Create the order */
INSERT INTO MovieOrder(orderTime, dollarAmount, vendorId, userId, movieId)
VALUES ("2007-03-20 14:27:21", 18.99, 13, 6, 9);

/* Then assign a ticket count */
INSERT INTO TheaterOrder(confirmationNumber, ticketCount)
VALUES (13, 2);

/* Finally, assign the seats */
INSERT INTO TheaterOrderSeats(confirmationNumber, seatId)
VALUES (13, "G10");
INSERT INTO TheaterOrderSeats(confirmationNumber, seatId)
VALUES (13, "G09");

/* Required Task D */
/* Create a relation between a person and the movie they're in */
INSERT INTO Credit (role, personId, movieId)
VALUES("Actor", 1, 5);

/* Then, relate the actress to a character in the movie */
INSERT INTO CreditCharacter (creditId, picture, name)
VALUES ("1", "mr_incredible.jpg", "Mr. Incredible");

/* Required Task E */
SELECT studio 
FROM
	(SELECT m.studio AS studio, SUM(mo.dollarAmount) AS revenue
	FROM Movie m INNER JOIN MovieOrder mo ON m.movieId = mo.movieId
	GROUP BY studio
	ORDER BY revenue DESC
	LIMT 10);

/* Required Task F */
SELECT m.name AS movieName
FROM Movie m INNER JOIN Credit c ON m.movieId = c.movieId INNER JOIN Professional p ON c.creditId = p.creditId
WHERE c.role = "Director" AND p.lastname = <PARAM>;

/* Required Task G */
SELECT m.name AS movieName, m.coverPicture AS moviePicture
FROM SiteUser su INNER JOIN MovieOrder mo ON su.userId = mo.userId INNER JOIN Movie m ON m.movieId = mo.movieId
WHERE su.userId = <PARAM>;

/* Required Task H */
SELECT m.name AS movieName
FROM SiteUser su INNER JOIN LovedMovies lm ON su.userId = lm.userID
EXCEPT
SELECT m.name AS movieName
FROM SiteUser su INNER JOIN OrderedMovies om ON su.userId = mo.userId 

/* Required Task I */
SELECT p.firstname || " " || p.lastname AS movieName, c.role AS role, p.picture AS personPicture
FROM Professional p INNER JOIN Credit c ON p.personId = c.personId INNER JOIN Movie m ON m.movieId = c.movieId
WHERE m.name = <PARAM>;

/* Required Task J */
SELECT genre
FROM
	(SELECT m.genre AS genre, SUM(mo.dollarAmount) AS revenue
	FROM Movie m INNER JOIN MovieOrder mo ON m.movieId = mo.movieId
	GROUP BY m.Genre
	ORDER BY revenue DESC
	LIMT 3);
