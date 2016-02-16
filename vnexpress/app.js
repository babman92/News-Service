var express = require('express');
var app = new express();
var fs = require('fs');
var conn = require('../connection.js');
conn.initConnectionToDB();

var numberArticlePerPage = 23;
app.get('/api/article/lists', function(req, res){
	// var data = { 
	// 	status: true,
	// 	message: 'Hello client'
	// }
	var page = req.param('page');
	if (page==undefined) {
		page = 1;
	};
	var startIndex = page * numberArticlePerPage ;
	var sql = 'select * from article_list limit ' + startIndex +','+numberArticlePerPage;
	conn.excuteQuery(sql, function(data){
		var articles = {
			data: data
		}
		res.end(JSON.stringify(articles));	
	});
});

app.get('/api/article/detail', function(req, res){
	var id = req.param('id');
	if (id==undefined) {
		id = 261;
	};
	var sql = 'select * from article_detail where article_id = ' + id;
	conn.excuteQuery(sql, function(data){
		res.end(JSON.stringify(data));
	});
});

var server = app.listen(2016, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Server is running at http://%s:%s', 'localhost', port);
});