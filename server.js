var fs = require('fs');
var express = require('express'),
    bodyParser = require('body-parser'),
    corser = require('corser'),
    app = express();

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(corser.create());

app.get('/test',function(req,res){
  fs.createReadStream(__dirname+'/public/data.json').pipe(res);
});

app.get('/test2',function(req,res){
  var data = [1,2,3,4,5,6,7,8,9].reduce(function(m,o){
    var now = Date.now();
    m.push({
      id: o,
      x: o*10,
      y: o*10,
      content: "# Title0"+o+"\n"
    });
    return m
  },[]);
  res.json(data);
});

app.post('/save',function(req,res){
  var data = req.body.data;
  console.log(data);
  res.json({success: true});
});

var port = process.env.PORT || 3000;
app.listen(port,function(){
  console.log([
    '\033[32m',
    'Server Starts At http://localhost:',
    port,
    '\033[39m'
  ].join(''));
});
