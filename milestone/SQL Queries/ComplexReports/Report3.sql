SELECT movieName
FROM
	(SELECT m.Name AS movieName, COUNT(*) AS movieCount
	FROM LovedMovies lm INNER JOIN Movie m ON lm.movieId = m.movieId INNER JOIN MovieOrder mo ON mo.movieId = m.movieId INNER JOIN StreamingOrder so ON so.confirmationNumber = mo.confirmationNumber
	GROUP BY m.Name
	ORDER BY movieCount DESC);
