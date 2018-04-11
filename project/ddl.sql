/* USE MySQL */

CREATE DATABASE IF NOT EXISTS Project;

/* Entity for Professionals */
CREATE TABLE IF NOT EXISTS Professional
(
    personId int NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    picture VARCHAR(255),
    dob DATE,
    PRIMARY KEY (personId)
);

/* Entity for Studio */
CREATE TABLE IF NOT EXISTS Studio
(
    studioId int NOT NULL AUTO_INCREMENT,
    studioName VARCHAR(255) NOT NULL,
    PRIMARY KEY (studioId)
);

/* Entity for Genre */
CREATE TABLE IF NOT EXISTS Genre
(
    genreId int NOT NULL AUTO_INCREMENT,
    genreName VARCHAR(255) NOT NULL,
    PRIMARY KEY (genreId)
);

/* Entity for Movies */
CREATE TABLE IF NOT EXISTS Movie
(
    movieId int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    genreId int NOT NULL,
    releaseDate DATE NOT NULL,
    studioId int NOT NULL,
    coverPicture VARCHAR(255) NOT NULL,
    PRIMARY KEY (movieId),
    FOREIGN KEY(studioId) references Studio (studioId) on delete cascade,
    FOREIGN KEY(genreId) references Genre (genreId) on delete cascade
);

/* Entity for Credit */
CREATE TABLE IF NOT EXISTS Credit
(
    creditId int NOT NULL AUTO_INCREMENT,
    role VARCHAR(255) NOT NULL,
    personId int NOT NULL,
    movieId int NOT NULL,
    PRIMARY KEY (creditId),
    FOREIGN KEY(personId) references Professional (personId) on delete cascade,
    FOREIGN KEY(movieId) references Movie (movieId) on delete cascade
);

/* Entity for Credit Character */
CREATE TABLE IF NOT EXISTS CreditCharacter
(
    creditId int NOT NULL,
    characterId int NOT NULL AUTO_INCREMENT,
    picture VARCHAR(255),
    name VARCHAR(255),
    FOREIGN KEY(creditId) references Credit (creditId) on delete cascade,
    PRIMARY KEY(characterId)
);
    
/* Entity for User */    
CREATE TABLE IF NOT EXISTS SiteUser 
(
    userId int NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    streetAddr VARCHAR(255),
    city VARCHAR(255),
    postalCode VARCHAR(255),
    country VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    profilePicture VARCHAR(255),
    PRIMARY KEY(userId, email)
);

/* Entity for User's Phone Numbers */
CREATE TABLE IF NOT EXISTS SiteUserPhone
(
    userId int NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL,
    PRIMARY KEY(userId, phoneNumber),
    FOREIGN KEY(userId) references SiteUser (userId) on delete cascade
);

/* Entity for Loved Movies */
CREATE TABLE IF NOT EXISTS LovedMovies 
(
    movieId int NOT NULL,
    userId int NOT NULL,
    PRIMARY KEY(movieId, userId),
    FOREIGN KEY(userId) references SiteUser (userId) on delete cascade,
    FOREIGN KEY(movieId) references Movie (movieId) on delete cascade
);

/* Entity for Vendors */
CREATE TABLE IF NOT EXISTS Vendor
(
    vendorId int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY(vendorId)
);   

/* Entity for Streaming Vendors */
CREATE TABLE IF NOT EXISTS StreamingVendor
(
    vendorId int NOT NULL UNIQUE,
    url VARCHAR(255),
    PRIMARY KEY(vendorId),
    FOREIGN KEY(vendorId) references Vendor (vendorId) on delete cascade
); 

/* Entity for Theater Vendors */
CREATE TABLE IF NOT EXISTS TheaterVendor
(
    vendorId int NOT NULL UNIQUE,
    location VARCHAR(255),
    PRIMARY KEY(vendorId),
    FOREIGN KEY(vendorId) references Vendor (vendorId) on delete cascade
); 

/* Entity for Movie Order */
CREATE TABLE IF NOT EXISTS MovieOrder
(
    confirmationNumber int NOT NULL AUTO_INCREMENT,
    orderTime DATETIME,
    dollarAmount decimal NOT NULL,
    vendorId int NOT NULL,
    userId int NOT NULL,
    movieId int NOT NULL,
    PRIMARY KEY(confirmationNumber),
    FOREIGN KEY(vendorId) references Vendor (vendorId) on delete cascade,
    FOREIGN KEY(userId) references SiteUser (userId) on delete cascade,
    FOREIGN KEY(movieId) references Movie (movieId) on delete cascade
);

/* SubType Entity for Movie Orders from a Streaming Vendor*/
CREATE TABLE IF NOT EXISTS StreamingOrder
(
    confirmationNumber int NOT NULL UNIQUE,
    expiration DATETIME,
    PRIMARY KEY (confirmationNumber),
    FOREIGN KEY (confirmationNumber) references MovieOrder (confirmationNumber) on delete cascade
);

/* SubType Entity for Movie Orders from a Theater Vendor */
CREATE TABLE IF NOT EXISTS TheaterOrder
(
    confirmationNumber int NOT NULL UNIQUE,
    ticketCount int NOT NULL,
    PRIMARY KEY (confirmationNumber),
    FOREIGN KEY (confirmationNumber) references MovieOrder (confirmationNumber) on delete cascade
);

/* Entity for Movie Pictures */ 
CREATE TABLE IF NOT EXISTS MoviePictures 
(
    pictureId int NOT NULL AUTO_INCREMENT,
    movieId int NOT NULL,
    picture VARCHAR(255) UNIQUE,
    PRIMARY KEY (pictureId),
    FOREIGN KEY (movieId) references Movie (movieId) on delete cascade
);