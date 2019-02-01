var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
     console.log("Handling a request");
    
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;   
    console.log(query);
    
    res.writeHead(200, {'Content-Type': 'text/html'});

//===============================================================================================================
//REPEAT 
    if (query['cmd'] == 'repeat')
    {
    var word = query['word'];
    var n = word.length;

    console.log("RUNNING REPEAT CMD");
    res.write('<p>Here are the results</p>');
    res.write("the word you selected was " + word);
    console.log(n);
    var i;
    for (i = 0; i < word.length; i++) 
    { 
     res.write("<pre><br>" + word + "</pre>");
    }
    
    }
//===============================================================================================================
//DOTTED
   else if(query['cmd']=='dotted')
    {
    
    console.log("RUNNING DOTTED CMD");
        var word1 = query['word1'];
        var word2 = query['word2'];
        var word1length = word1.length;
        var word2length = word2.length;
        var dots = "";
        var differnce = 30 - (word1length + word2length);
        console.log(word1length + " " + word2length);
        console.log(differnce);
        
        for(var q =0; q<differnce;q++)
        {
        dots = dots + '.';
            
        }

        
        res.write("<pre>"+word1+dots+word2+"</pre>");
    }
//===============================================================================================================
//STATS
    
    else if(query['cmd']=='stats')
    {
      console.log('running stats');
      console.log(query);
      var avg = 0;
      console.log(query['grades'].length);
      for (var i in query['grades'])
      {
        avg = avg + parseInt(query['grades'][i]);
      }
      var y = query['grades'].sort();
      console.log(y[0]);
      console.log(y[query['grades'].length-1]);
      res.write('<pre>'+"avg: "+avg/query['grades'].length+ " min: " +y[0] + " max: " + y[query['grades'].length-1] + '</pre>');
      
    }

    res.end();
}