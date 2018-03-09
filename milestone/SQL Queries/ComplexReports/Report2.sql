SELECT genre 
FROM
	(SELECT m.Genre AS genre, COUNT(*) AS genreCount
	FROM SiteUser su INNER JOIN LovedMovies lm ON su.userId = lm.userId INNER JOIN Movie m ON m.movieId = mo.movieId
	WHERE su.userId = <PARAM>
	GROUP BY m.Genre
	ORDER BY genreCount DESC
	LIMIT 1);
