FROM mysql:latest
ADD init.sql /docker-entrypoint-initdb.d/a_init.sql
ADD prisma-schema.sql /docker-entrypoint-initdb.d/b_schema.sql
ADD data.sql /docker-entrypoint-initdb.d/c_data.sql

ENV MYSQL_DATABASE=cocktails
EXPOSE 3306
