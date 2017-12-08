CREATE DATABASE airline_bookings;


CREATE TABLE airport (
    id SERIAL NOT NULL PRIMARY KEY,
    iata CHARACTER (3),
    name VARCHAR (100),
    state CHARACTER (2),
    country CHARACTER (3)
);


CREATE TABLE airline (
    id SERIAL NOT NULL PRIMARY KEY,
    code CHARACTER (3),
    name VARCHAR (100),
    country CHARACTER (3)
);

CREATE TABLE flight (
    id SERIAL NOT NULL PRIMARY KEY,
    airline_id SERIAL REFERENCES airline (id),
    arrive_airport_id SERIAL REFERENCES airport (id),
    depart_airport_id SERIAL REFERENCES airport (id),
    a_airport_time TIMESTAMP,
    d_airport_time TIMESTAMP,
    number INTEGER NOT NULL,
    DATE DATE
);


CREATE TABLE class (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR (20)
);

CREATE TABLE tickets (
    flight_id SERIAL REFERENCES flight (id),
    class_id SERIAL REFERENCES class (id),
    price MONEY,
    max_seats INTEGER
);


CREATE TABLE customer (
    id SERIAL NOT NULL PRIMARY KEY,
    email VARCHAR (320),
    name CHARACTER (50),
    mile_count INTEGER,
    home_airport SERIAL REFERENCES airport (id)
);

CREATE TABLE address (
    id SERIAL NOT NULL PRIMARY KEY,
    addressLine1 VARCHAR (120) NOT NULL,
    addressLine2 VARCHAR (120),
    addressLine3 VARCHAR (120),
    addressLine4 VARCHAR (120),
    locality VARCHAR (20),
    region VARCHAR (20),
    zipcode VARCHAR (5),
    country CHARACTER (3) NOT NULL
);


CREATE TABLE credit_card (
    id SERIAL NOT NULL PRIMARY KEY,
    address_id SERIAL REFERENCES address (id),
    number VARCHAR (16),
    pin VARCHAR (4)
);


CREATE TABLE booking (
    id SERIAL NOT NULL PRIMARY KEY,
    cust_booking SERIAL REFERENCES customer (id),
    booking_cc SERIAL REFERENCES credit_card (id)
);


CREATE TABLE flight_booking (
    flight_id SERIAL REFERENCES flight (id),
    class_id SERIAL REFERENCES class (id),
    booking_id SERIAL REFERENCES booking (id)
);

CREATE TABLE cust_cc (
    credit_card_id SERIAL REFERENCES credit_card (id),
    customer_id SERIAL REFERENCES customer (id)
);

CREATE TABLE cust_addr (
    customer_id SERIAL REFERENCES customer (id),
    address_id SERIAL REFERENCES address (id)
);

CREATE INDEX cust_email ON customer USING HASH (email);
CREATE INDEX flight_quick ON flight (airline_id, number);
