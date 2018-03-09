SELECT genre
FROM
	(SELECT m.genre AS genre, SUM(mo.dollarAmount) AS revenue
	FROM Movie m INNER JOIN MovieOrder mo ON m.movieId = mo.movieId
	GROUP BY m.Genre
	ORDER BY revenue DESC
	LIMT 3);