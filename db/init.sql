-- init.sql

-- Create a new user
CREATE USER 'api_user'@'%' IDENTIFIED BY 'secret';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON cocktails.* TO 'api_user'@'%';

-- Flush privileges
FLUSH PRIVILEGES;

