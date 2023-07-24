DROP TABLE IF EXISTS users;

CREATE TABLE users(
    social BIGINT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phone BIGINT,
    street_addr VARCHAR(255),
    city VARCHAR(255),
    state CHAR(2),
    zip INT,
    status ENUM('M', 'S')
);

DROP TABLE IF EXISTS w2;

CREATE TABLE w2 (
    social BIGINT,
    emp_tin INT,
    wages DECIMAL(10,2) NOT NULL CHECK (wages >= 0),
    fed_withheld DECIMAL(10,2) NOT NULL CHECK (fed_withheld >= 0),
    PRIMARY KEY (social, emp_tin),
    FOREIGN KEY (social) REFERENCES users(social)
);

DROP TABLE IF EXISTS '1099';

CREATE TABLE "1099" (
    social BIGINT,
    payer_tin INT,
    compensation DECIMAL(10,2) NOT NULL CHECK (compensation >= 0),
    fed_withheld DECIMAL(10,2) NOT NULL CHECK (fed_withheld >= 0),
    PRIMARY KEY (social, payer_tin),
    FOREIGN KEY (social) REFERENCES users(social)
);