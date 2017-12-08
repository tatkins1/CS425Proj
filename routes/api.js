var express = require('express');
var router = express.Router();
var path = require('path');
var Pool = require('pg').Pool;
var fs = require('fs');
var config = {
    "host": 'localhost',
    "user": 'testuser',
    "password": "testpassword",
    "database": "testdb"
}
//psql scripts
//Create database testdb;
//Create user testuser;
//grant all privileges on database testdb to testuser;
//alter role testuser with password 'testpassword';
//psql testdb testuser
var pool = new Pool(config);

//dataBaseSetUp();
async function dataBaseSetUp() {
	
 //	   await pool.query("DROP TABLE IF EXISTS airline_bookings;"+data.toString());
}







router.get('/', function(req, res, next) {
    console.log("REQUEST RECIEVED");
    res.send({ "Hello": "world" }).status(200);
});
router.post('/customer', function(req, res, next) {
    //register customer. adding cu
    console.log('adding customer to the database');
    let email = req.body.email;
    let firstname = req.body.name;
    get_hits(email, firstname);
    /* customers.then(c => {
         console.log(c);
         res.send(c).status(200);
     });*/
    res.send(true).status(200);
    async function get_hits(email, firstname) {

        var response = await pool.query("INSERT INTO customer (email, name, mile_count, home_airport) VALUES ('" + email + "','" + firstname + "',NULL, 5011);");
        console.log(response);
        var customers = await pool.query("select * from customer");
        //return customers.rows;
    }


});
router.put('/customer', function(req, res, next) {
    // edit adresses and payment methods
    let addresses = req.body.addresses;
    let payment_methods = req.body.payment_methods;
});
router.post('/login', function(req, res, next) {
    //login

    let email = req.body.email;
    let name = req.body.name;
    checkUser(name, email).then(e => {
        if (e.rows.length == 1) {

            console.log("success");
            res.send(true).status(200);
        } else {

            console.log("fail");
            res.send(false).status(200);
        }
    });

    async function checkUser(name, email) {

        let response = await pool.query("SELECT * FROM CUSTOMER WHERE name='" + name + "' AND email='" + email + "';");

        return response;
    }


});
router.get('/search', function(req, res, next) {
    // edit adresses and payment methods


    let depature = req.query.depature;
    let destination = req.query.destination;
    let depature_date;
    let return_date;
    let connections;
    let price;
    let trip_time;



});
router.get('/flights', function(req, res, next) {
    // edit adresses and payment methods

    let origin = req.query.origin;
    console.log(origin);
    console.log(req.query);
    let flights = getFlights(req.query);
    flights.then(function(f) {
    	console.log(f);
    	res.send(f).status(200);
    });
    //let output = {};
    //res.send(output).status(200);


    async function getFlights(flight_data) {
    		let mapmap ={
    			"LAX":"5011",
    			"ORD":"5996"
    		};
    		//flight_data.origin=mapmap[flight_data.origin];
    		//flight_data.destination=mapmap[flight_data.origin];
    		if(flight_data.origin==7126){
    			let response = await pool.query(
    		"SELECT tickets.class_id, tickets.price, flight.a_airport_time - flight.d_airport_time AS duration, flight.d_airport_time, flight.a_airport_time, flight.id, airline.code FROM flight INNER JOIN tickets ON flight.id = tickets.flight_id INNER JOIN airline ON flight.airline_id = airline.id WHERE depart_airport_id = 7126 AND arrive_airport_id = 6514 AND departure_date = DATE '2017-10-23';"
    		);
    		 return response.rows;
    		}

    		else{
    	let response = await pool.query(
    		"SELECT tickets.class_id, tickets.price, flight.a_airport_time - flight.d_airport_time AS duration, flight.d_airport_time, flight.a_airport_time, flight.id, airline.code FROM flight INNER JOIN tickets ON flight.id = tickets.flight_id INNER JOIN airline ON flight.airline_id = airline.id WHERE depart_airport_id = 5996 AND arrive_airport_id = 5011 AND departure_date = DATE '2017-10-22';"
    		);
    		 return response.rows;

    		}

       
    }

});

module.exports = router;