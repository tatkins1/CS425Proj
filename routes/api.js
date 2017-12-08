var express = require('express');
var router = express.Router();
var path = require('path');
var Pool = require('pg').Pool;
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
//connect testdb as testuser
var pool = new Pool(config);










router.get('/', function(req, res, next) {
    console.log("REQUEST RECIEVED");
    res.send({ "Hello": "world" }).status(200);
});
router.post('/customer', function(req, res, next) {
    //add to customer database
    //let customer_info = req.body.customer_info;
    //let firstname= req.body.firstname;

    console.log('POST CUSTOMER');
    let email = req.body.email;
    let firstname = req.body.name;
    console.log(email);
    console.log(firstname);
    get_hits(email, firstname);
    /* customers.then(c => {
         console.log(c);
         res.send(c).status(200);
     });*/
    res.send(true).status(200);
    async function get_hits(email, firstname) {

        var response = await pool.query("INSERT INTO customer (name, email) VALUES ('" + email + "','" + firstname + "');");
        var customers = await pool.query("select * from customer");
        console.log(customers.rows);
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
            res.send({ "login": true }).status(200);
        } else {

            console.log("fail");
            res.send({ "login": false }).status(200);
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
    	res.send(flights.rows).status(200);
    });
    let output = {};
    res.send(output).status(200);


    async function getFlights(flight_data) {
    		if(flight_data.return){

    		}

    		else{
    	let response = await pool.query(
    		"SELECT * FROM FLIGHT WHERE origin='${flightdata.origin}' AND destination='${flightdata.destination}'  AND depature_date='${flightdata.depature_date}' AND connections='${flightdata.connections}' AND max_price = '${flightdata.max_price}' AND travel_time='${flightdata.travel_time}' "
    		);
    		 return response;
    		}

       
    }

});

module.exports = router;