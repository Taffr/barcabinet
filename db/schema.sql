CREATE DATABASE IF NOT EXISTS cocktails DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_bin;

USE cocktails;

DROP TABLE IF EXISTS Recipe;
CREATE TABLE IF NOT EXISTS Recipe (
  id INT NOT NULL,
  name VARCHAR(255) NOT NULL UNIQUE,
  garnish TEXT,
  preparation TEXT,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS User;
CREATE TABLE IF NOT EXISTS User (
  id INT NOT NULL AUTO_INCREMENT,
  name TEXT NOT NULL,
  hash TEXT NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS Ingredient;
CREATE TABLE IF NOT EXISTS Ingredient (
  id INT NOT NULL,
  name VARCHAR(255) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS Dosage;
CREATE TABLE IF NOT EXISTS Dosage (
  recipeId INT NOT NULL,
  ingredientId INT NOT NULL,
  amount FLOAT,
  unit TEXT,
  PRIMARY KEY (recipeId, ingredientId),
  FOREIGN KEY (recipeId) REFERENCES Recipe(id),
  FOREIGN KEY (ingredientId) REFERENCES Ingredient(id)
);


DROP TABLE IF EXISTS Favourite;
CREATE TABLE IF NOT EXISTS Favourite (
  userId INT NOT NULL,
  recipeId INT NOT NULL,
  PRIMARY KEY(userId, recipeId),
  FOREIGN KEY(userId) REFERENCES User(id),
  FOREIGN KEY(recipeId) REFERENCES Recipe(id)
);

DROP TABLE IF EXISTS SavedIngredient;
CREATE TABLE IF NOT EXISTS SavedIngredient (
  userId INT NOT NULL,
  ingredientId INT NOT NULL,
  PRIMARY KEY(userId, ingredientId),
  FOREIGN KEY(userId) REFERENCES User(id),
  FOREIGN KEY(ingredientId) REFERENCES Ingredient(id)
);

CREATE USER IF NOT EXISTS 'api_user'@'%' IDENTIFIED BY 'secret';
GRANT SELECT ON cocktails.* TO 'api_user'@'%';
