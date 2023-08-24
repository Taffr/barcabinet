-- init.sql

-- Create the database 
CREATE DATABASE IF NOT EXISTS cocktails DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_bin;

-- Create a new user
CREATE USER 'api_user'@'%' IDENTIFIED BY 'secret';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON *.* TO 'api_user'@'%';

-- Flush privileges
FLUSH PRIVILEGES;
