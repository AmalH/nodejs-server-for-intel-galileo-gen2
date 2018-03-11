var express = require('express')
var mysql = require('mysql')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())
 

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "iotdb"
  })


con.connect(function(err) {
    if (err) throw err
    console.log("Connected!")
})

app.get('/', function (req, res) {
  res.send('Hello Here')
})

/*** ADD ***/
app.get('/addTemp', function (req, res) { 

  var query = con.query("INSERT INTO temperatures  (value) VALUES ("+req.query.value+")", function(err, rows)
        {
          if (err)
              console.log("Error inserting : %s ",err );
          else
              res.json({msg:"inserted successfully"})
        });
})

/*** GET ALL ***/
app.get('/getAll', function (req, res) { 

  var query = con.query('SELECT * FROM temperatures',function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            else
            res.json({rows})
         });
})

/*** GET By Id ***/
app.get('/getById', function (req, res) { 
    var query = con.query('SELECT value FROM temperatures WHERE id='+req.query.id,function(err,result,rows)
          {
              if(err)
                  console.log("Error Selecting : %s ",err );
              else
                 res.json(result[0].value) 
           });
  })

/*** GET By Value ***/
app.get('/getByValue', function (req, res) { 

    var query = con.query('SELECT * FROM temperatures WHERE value='+req.query.value,function(err,result,rows)
          {
              if(err)
                  console.log("Error Selecting : %s ",err );
              else
                  res.json({Result:rows})
           });
  })

/*** DELETE ***/
app.get('/delete', function (req, res) { 
  var query = con.query("DELETE FROM temperatures  WHERE id = "+req.query.id, function(err, rows)
   {
        if(err)
            console.log("Error deleting : %s ",err );
        else
            res.json({Result:"deleted"})
        
   });
})

/*** UPDATE ***/
app.get('/update', function (req, res) { 
  var query = con.query("UPDATE temperatures set value="+req.query.value+" WHERE id ="+ req.query.id, function(err, rows)
  {
    if (err)
        console.log("Error Updating : %s ",err );
    else
       res.json({Result:"updated"})
  });
})


// Port Number
const port = 4300;

// server address
const address = '172.16.220.137'; 

app.listen(port, address, () => {
  console.log('Server started on address '+address+' and on port '+port);
});