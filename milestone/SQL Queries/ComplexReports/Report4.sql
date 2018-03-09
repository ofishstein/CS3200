SELECT movieName
FROM
	(SELECT m.name AS movieName, SUM(mo.dollarAmount) AS revenue
	FROM Movie m INNER JOIN Credit c ON m.movieId = c.creditId INNER JOIN MovieOrder mo ON mo.movieId = m.movieId INNER JOIN Professional p ON p.personId = c.personId
	WHERE c.role = "Director" AND p.firstname || " " || p.lastname = <PARAM>
	GROUP BY m.name
	ORDER BY revenue DESC);
