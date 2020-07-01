const express = require('express')
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000
var formidable = require('formidable');
var mv = require('mv');
app.get('/', (req, res) => res.sendFile(__dirname +'/index.html'))
app.post('/upload',(req,res) => {
     var form = new formidable.IncomingForm();
     form.parse(req, function (err, fields, files) {
     var oldpath = files.filetoupload.path;
     var newpath = __dirname + "/" + files.filetoupload.name;
     mv(oldpath, newpath, function (err) {
          if (err) throw err;
          res.write('File uploaded and moved!');
         
          res.end();
          });
     });
});
app.listen(port, () => console.log(`App listening on ${port}!`))