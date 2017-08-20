var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res){
  var resp = {"unix": null,
              "natural": null };

  var d = decodeURIComponent(req.url);
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
  console.log(resp);
  res.writeHead(200, {'Content-Type':'text/html'});
  res.end(JSON.stringify(resp));
}).listen(3000);
