CREATE DATABASE IF NOT EXISTS cocktails DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_bin;

USE cocktails;

DROP TABLE IF EXISTS recipes;
CREATE TABLE IF NOT EXISTS recipes (
  recipe_id INT NOT NULL,
  name VARCHAR(255) NOT NULL UNIQUE,
  garnish TEXT,
  preparation TEXT,
  PRIMARY KEY (recipe_id)
);

DROP TABLE IF EXISTS ingredients;
CREATE TABLE IF NOT EXISTS ingredients (
  ingredient_id INT NOT NULL,
  name VARCHAR(255) UNIQUE NOT NULL,
  PRIMARY KEY (ingredient_id)
);

DROP TABLE IF EXISTS dosages;
CREATE TABLE IF NOT EXISTS dosages (
  recipe_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  amount FLOAT,
  unit TEXT,
  PRIMARY KEY (recipe_id, ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
);


DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL AUTO_INCREMENT,
  name TEXT NOT NULL,
  hash TEXT NOT NULL,
  PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS favourites;
CREATE TABLE IF NOT EXISTS favourites (
  user_id INT NOT NULL,
  recipe_id INT NOT NULL,
  PRIMARY KEY(user_id, recipe_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id),
  FOREIGN KEY(recipe_id) REFERENCES recipes(recipe_id)
);

DROP TABLE IF EXISTS user_ingredients;
CREATE TABLE IF NOT EXISTS user_ingredients (
  user_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  PRIMARY KEY(user_id, ingredient_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id),
  FOREIGN KEY(ingredient_id) REFERENCES ingredients(ingredient_id)
);

CREATE USER IF NOT EXISTS 'api_user'@'%' IDENTIFIED BY 'secret';
GRANT SELECT ON cocktails.* TO 'api_user'@'%';
