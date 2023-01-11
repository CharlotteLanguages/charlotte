CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee (
    id INT(25) PRIMARY KEY AUTO INCREMENT,
    NAME VARCHAR(255) DEFAULT NULL,
    salary VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
);

describe employee;

INSERT INTO employeS values
(1, 'John', '1000'),
(2, 'John', '2000'),
(3, 'John', '3000'),
(4, 'John', '4000');