CREATE DATABASE thi_thuc_hanh_MD3;
USE thi_thuc_hanh_MD3;
CREATE TABLE product
(
    id int auto_increment primary key not null ,
    name varchar(100) not null ,
    city varchar(100) not null ,
    bedroom int not null  ,
    toilet int not null ,
    price int not null ,
    description varchar(250)
);
SELECT name,city,price FROM product;