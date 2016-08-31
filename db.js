var exports = module.exports = {}

var config = require('./config.js');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = config.database.uri+':'+config.database.port+'/blog';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

exports.insert = function(db, collection, doc, callback) {
  	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  db.collection(collection).insertOne( doc, function(err, result) {
	    assert.equal(err, null);
		callback();
		console.log(result.documents);
	  });
  });
};

exports.findAll = function(db, collection, callback) {
	var out = [];
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		var cursor = db.collection(collection).find();
		console.log(cursor);
		cursor.each(function(err, doc) {
			assert.equal(null, err);
			if (doc != null) {
         		out.push(doc);
	      	} else {
	         	callback();
	      	}
		});
		return out;
	});
}

exports.findMany = function(db, collection, amount=10, callback) {

}

exports.find = function(db, collection, doc_id, callback) {

}

exports.test = function(arg) {
	console.log('test');
	return arg;
}

exports.delete = function(db, collection, doc_id, callback) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
	})
};
