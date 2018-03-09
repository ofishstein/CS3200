SELECT m.name AS movieName
FROM SiteUser su INNER JOIN LovedMovies lm ON su.userId = lm.userID
EXCEPT
SELECT m.name AS movieName
FROM SiteUser su INNER JOIN OrderedMovies om ON su.userId = mo.userId 