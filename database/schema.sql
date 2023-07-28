DROP TABLE IF EXISTS users;

CREATE TABLE users(
    social BIGINT(9) UNSIGNED PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone BIGINT(11) UNSIGNED,
    street_addr VARCHAR(255),
    city VARCHAR(255),
    state CHAR(2),
    zip INT(5) UNSIGNED,
    status CHAR(1)
);