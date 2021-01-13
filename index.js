const express = require('express')
const app = express()
const port = 3000;
const serveStatic = require('serve-static');
var fs = require('fs');
let results = [];
const bodyParser = require('body-parser')


app.use(serveStatic('testwork', { 'index': ['index.html', 'index.htm'] }))
app.use(bodyParser.json({ type: ["application/json"] }));


app.get('/results', async(req, res) => {
  fs.readFile('results.txt', 'utf8', function(err, data) {
    results = JSON.parse(JSON.stringify(data));
    results => (results).sort((a, b) => a.Result < b.Result ? 1 : -1 );   
});
res.json(results);
})


app.post('/results', async(req, res) => {  
 
  fs.appendFile('results.txt', JSON.stringify(req.body), function(error){
    if (error) throw error;
  } )    
  res.status = 200;
})

app.post('/clearResults', async(req, res) => {  
 
  fs.writeFile('results.txt', JSON.stringify(req.body), function(error){
    if (error) throw error;
  } )    
  res.status = 200;
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})