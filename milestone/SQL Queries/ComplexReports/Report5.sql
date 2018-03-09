SELECT movieName
FROM
	(SELECT m.Name AS movieName, SUM(mo.dollarAmount) AS revenue
	FROM Movie m INNER JOIN MovieOrder mo ON m.movieId = mo.movieId INNER JOIN TheaterOrder to ON mo.confirmationNumber = to.confirmationNumber
	WHERE m.releaseDate < <PARAM> AND m.releaseDate > <PARAM>
	GROUP BY m.Name
	ORDER BY revenue DESC);