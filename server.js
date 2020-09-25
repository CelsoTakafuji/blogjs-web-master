var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var roteador = require(__dirname +'/static/modulos/usuario/cadastro/roteador');
var fs = require('fs');

app.use(function(req, res, next) {
	res.setHeader(
		'Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type');
	next();
});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));
app.use(roteador);

app.listen(port);
