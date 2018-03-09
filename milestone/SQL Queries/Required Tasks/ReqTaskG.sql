SELECT m.name AS movieName, m.coverPicture AS moviePicture
FROM SiteUser su INNER JOIN MovieOrder mo ON su.userId = mo.userId INNER JOIN Movie m ON m.movieId = mo.movieId
WHERE su.userId = <PARAM>;