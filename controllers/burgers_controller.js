// Importing dependencies: npm express to create a router
// and burger.js to use the database

var express = require('express');
var burger = require("../models/burger.js");
// adding ability to route
var router = express.Router();

// Creating all the routes and setting up logic within those 
// routes where required.

// GET request reads
// The route created ("/") is made up by us
router.get("/", function(req, res) {
	burger.selectAll(function(data) {
		// handlebars will only accept objects,
		// so an object must be passed here to make this work
		var handlebarsObject = {
			burgers: data
        };
        // to make the result appear on the index.handlebars page
        res.render("index", handlebarsObject);
    });
});

// POST request creates new data for database
// Remember that we make up the route name here as well
router.post("/api/burgers", function(req, res) {
    burger.insertOne(req.body.burger_name,function(result){
        console.log(result);
        res.redirect("/")
    });
});

// PUT request updates data.
// This is where the burger goes from "not devoured" to "devoured"

router.put("/api/burgers/:id", function(req, res) {
    var burgerId = "id = " + req.params.id;

    console.log("Burger devour status updated for", burgerId);
    burger.updateOne({
        //Force devoured = 1, as in {devoured: true}
        devoure: 1
    }, burgerId, function(result) {
    if (result.changedRows == 0) {
        //If no rows are changed, then the ID must not exist and a 404 will returned
        return res.status(404).end();
        } else {
        res.status(200).end();
        }
    });
}); 

// Export routes for use on server.js
module.exports = router;
