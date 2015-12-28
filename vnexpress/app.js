var express = require('express');
var app = new express();
var fs = require('fs');
var conn = require('../connection.js');
conn.initConnectionToDB();

var numberArticlePerPage = 2;
app.get('/lists/:page', function(req, res){
	var page = req.params.page;
	var startIndex = page * numberArticlePerPage ;
	var sql = 'select * from article_list limit ' + startIndex +','+numberArticlePerPage;
	conn.excuteQuery(sql, function(data){
		var articles = {
			data: data
		}
		res.end(JSON.stringify(articles));	
	});
});

var server = app.listen(2016, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Server is running at http://%s:%s', 'localhost', port);
});