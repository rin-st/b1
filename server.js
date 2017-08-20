
// init project
var express = require('express');
var app = express();

app.use(express.static('views'));

  app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:id", function(req, res){
  var resp = {"unix": null,
              "natural": null };

  var d = decodeURIComponent(req.params.id);
  for (var i = 0; i < d.length; i++){
    if (d[i]==='/') {
      d = d.slice(0,i) + d.slice(i+1, d.length);
      i--;
    }
  }
  
  var t = true;
  if (+d % 1 === 0) d = +d;
    else if (!isNaN(Date.parse(d))) d = Date.parse(d);
    else t = false;
  d = new Date(d);

  if (t){
    var mon = ['january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'];
  resp.unix = '' + d.getTime();
  resp.natural = '' + /*(d.getMonth()+1)*/ mon[d.getMonth()]+' '+ d.getDate() + ', ' +
                  d.getFullYear();
}
  res.writeHead(200, {'Content-Type':'text/html'});
  res.end(JSON.stringify(resp));
});
  var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}) 
