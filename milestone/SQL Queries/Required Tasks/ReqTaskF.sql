SELECT m.name AS movieName
FROM Movie m INNER JOIN Credit c ON m.movieId = c.movieId INNER JOIN Professional p ON c.creditId = p.creditId
WHERE c.role = "Director" AND p.lastname = <PARAM>;