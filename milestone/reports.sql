/* 
Report: 1

Purpose: Find a user's top 3 movie studios that they've ordered from

Usefulness: This can be useful as users may want to order from their most popular studios again

Complexity:
>= 3 tables join -> 1 point
1 subquery -> 1 point
Aggregate Functions -> 1 point
Grouping -> 1 point
WHERE/HAVING -> 1 point
Ordering fields -> 1 point
Strong Motivation -> 1 point

Score -> 7 Complex
*/
SELECT studio 
FROM
	(SELECT m.studio AS studio, COUNT(*) AS genreCount
	FROM SiteUser su INNER JOIN MovieOrder mo ON su.serId = mo.userId INNER JOIN Movie m ON m.movieId = mo.movieId
	WHERE su.userId = [PARAM]
	GROUP BY m.studio
	ORDER BY genreCount DESC
	LIMIT 3);



/* 
Report: 2

Purpose: Find a user's favorite genre based on loved movies

Usefulness: This can be very useful in allowing a user to determine their favorite genre so they can find more films of this genre that they love

Complexity:
>= 3 tables join -> 1 point
1 subquery -> 1 point
Aggregate Functions -> 1 point
Grouping -> 1 point
WHERE/HAVING -> 1 point
Strong Motivation -> 1 point
Ordering fields -> 1 point

Score ->  7 Complex
*/
SELECT genre 
FROM
	(SELECT m.Genre AS genre, COUNT(*) AS genreCount
	FROM SiteUser su INNER JOIN LovedMovies lm ON su.userId = lm.userId INNER JOIN Movie m ON m.movieId = lm.movieId
	WHERE su.userId = [PARAM]
	GROUP BY m.Genre
	ORDER BY genreCount DESC
	LIMIT 1);


/* 
Report: 3

Purpose: Find the most loved movies by all users that are available for streaming

Usefulness: This is super helpful in telling users which movies are popular so that they can be suggested to check those out

Complexity:
>= 3 tables join -> 1 point
1 subquery -> 1 point
Aggregate Functions -> 1 point
Grouping -> 1 point
Ordering fields -> 1 point
Strong Motivation -> 1 point

Score -> 6 Complex
*/
SELECT movieName
FROM
	(SELECT m.Name AS movieName, COUNT(*) AS movieCount
	FROM LovedMovies lm INNER JOIN Movie m ON lm.movieId = m.movieId INNER JOIN MovieOrder mo ON mo.movieId = m.movieId INNER JOIN StreamingOrder so ON so.confirmationNumber = mo.confirmationNumber
	GROUP BY m.Name
	ORDER BY movieCount DESC);


/* 
Report: 4

Purpose: Find a specific director's best selling films

Usefulness: This is very useful in the case a user would like to check out films be a specific director, often a director's best selling films are his most acclaimed ones and so a user now has a good place to start

Complexity:
>= 3 tables join -> 1 point
1 subquery -> 1 point
Aggregate Functions -> 1 point
Grouping -> 1 point
WHERE/HAVING -> 1 point
Ordering fields -> 1 point
Strong Motivation -> 1 point

Score -> 7 Complex
*/
SELECT movieName
FROM
	(SELECT m.name AS movieName, SUM(mo.dollarAmount) AS revenue
	FROM Movie m INNER JOIN Credit c ON m.movieId = c.creditId INNER JOIN MovieOrder mo ON mo.movieId = m.movieId INNER JOIN Professional p ON p.personId = c.personId
	WHERE c.role = "Director" AND p.firstname || " " || p.lastname = [PARAM]
	GROUP BY m.name
	ORDER BY revenue DESC);



/* 
Report: 5

Purpose: Find this year's box office hits

Usefulness: Most movie streaming buying companies software suggest the box office hits on their front page as these are the most attractive to users generally.

Complexity:
>= 3 tables join -> 1 point
1 subquery -> 1 point
Aggregate Functions -> 1 point
Grouping -> 1 point
WHERE/HAVING -> 1 point
Ordering fields -> 1 point
Strong Motivation -> 1 point

Score -> 7 Complex
*/
SELECT movieName
FROM
	(SELECT m.Name AS movieName, SUM(mo.dollarAmount) AS revenue
	FROM Movie m INNER JOIN MovieOrder mo ON m.movieId = mo.movieId INNER JOIN TheaterOrder tho ON mo.confirmationNumber = tho.confirmationNumber
	WHERE m.releaseDate < [PARAM] AND m.releaseDate > <[PARAM]
	GROUP BY m.Name
	ORDER BY revenue DESC);


