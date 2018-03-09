SELECT p.firstname || " " || p.lastname AS movieName, c.role AS role, p.picture AS personPicture
FROM Professional p INNER JOIN Credit c ON p.personId = c.personId INNER JOIN Movie m ON m.movieId = c.movieId
WHERE m.name = <PARAM>;