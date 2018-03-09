SELECT genre 
FROM
	(SELECT m.Genre AS genre, COUNT(*) AS genreCount
	FROM SiteUser su INNER JOIN MovieOrders mo ON su.serId = mo.userId INNER JOIN Movie m ON m.movieId = mo.movieId
	WHERE su.userId = <PARAM>
	GROUP BY m.Genre
	ORDER BY genreCount DESC);
