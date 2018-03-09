SELECT studio 
FROM
	(SELECT m.studio AS studio, SUM(mo.dollarAmount) AS revenue
	FROM Movie m INNER JOIN MovieOrder mo ON m.movieId = mo.movieId
	GROUP BY studio
	ORDER BY revenue DESC
	LIMT 10);