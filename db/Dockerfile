FROM mysql:latest
ADD schema.sql /docker-entrypoint-initdb.d/a_schema.sql
ADD data.sql /docker-entrypoint-initdb.d/b_data.sql

ENV MYSQL_DATABASE=cocktails
