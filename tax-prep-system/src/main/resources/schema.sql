DROP TABLE IF EXISTS users;

CREATE TABLE users(
    social BIGINT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone BIGINT,
    street_addr VARCHAR(255),
    city VARCHAR(255),
    state CHAR(2),
    zip INT,
    status CHAR(1)
);