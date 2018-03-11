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