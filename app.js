//热加载
// var webpack = require('webpack')
// var webpackDevMiddleware = require('webpack-dev-middleware')
// var webpackHotMiddleware = require('webpack-hot-middleware')
// var config = require('./webpack.dev.config')
// var compiler = webpack(config)
// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
// app.use(webpackHotMiddleware(compiler))


var express = require('express');
var path = require('path')
var fs = require('fs')
var markdown = require('markdown').markdown
var app = new express()

app.set('views',path.join(__dirname,'dist/views'))
app.set('views engine','ejs')

app.use(express.static(path.join(__dirname,'dist')))




var port = 7001

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

app.get('/comment',function(req,res){
 	if(req.headers['x-requested-with']!='XMLHttpRequest'){
  		res.redirect('/')
  		return
  	}

  	var path = req.query.doc
	  var md = fs.readFileSync('./dist/doc/'+path, "utf-8")
    var str = markdown.toHTML(md)
    
    res.send(str)
})
 
app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
