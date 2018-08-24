// Import orm.js to create functions that will interact with
// the database.
var orm = require("../config/orm.js");

var burgers = {
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },
    insertOne: function(valOfOtherCol, cb) {
        orm.insertOne("burgers",[
            "burger_name","devoured"
            ],[
            valOfOtherCol,false
            ],cb);
    }

};

//Export database function for the controller (burgers_controller.js)
module.exports = burgers;