//mongodb commands: http://howtonode.org/node-js-and-mongodb-getting-started-with-mongojs
//http://docs.mongodb.org/manual/reference/mongo-shell/

/*var databaseURI = "localhost:27017/somedb";
var collections = ["users", "blogs"];
var db = require("mongojs").connect(databaseURI, collections);

module.exports = db;

and then just require it where you need to connect to mongo like:

var db = require("./db");
*/

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('AddressBook', ['Persons']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/persons', function(req, res){
	console.log('Received find all persons request');
	db.Persons.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.get('/person/:id', function(req, res){
	console.log('Received findOne person request');
	db.Persons.findOne({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/addPerson', function(req, res){
	console.log(req.body);
	db.Persons.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})
});

app.delete('/deletePerson/:id', function(req, res){
	console.log("Received delete one person request...");
	db.Persons.remove({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.put('/updatePerson', function(req, res){
	console.log("Received updatePerson request");
	db.Persons.findAndModify({query: {"_id": new mongojs.ObjectId(req.body._id)}, 
										update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}
										}, function(err, docs){
											console.log(docs);
											res.json(docs);
										})
	});

app.get('/addresses/:id', function(req, res){
	console.log('Received findOne person addresses request');
	console.log(req.params.id);
	db.Persons.findOne({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs.addresses);
		res.json(docs);
	})
});




//app.use(express.static(__dirname + "/app/views"));
app.listen(3000);
console.log("server running on port 3000");