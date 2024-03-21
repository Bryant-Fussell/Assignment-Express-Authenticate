const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const port = 3000;
var fs = require("fs");
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://Usernew:KhvAOKrTpSFCxWge@cluster0.atsm2tk.mongodb.net/?retryWrites=true&w=majority";

app.listen(port);
console.log('Server started at http://localhost:' + port);

// Middleware to handle jsons and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//WILL CHECK FOR COOKIE IN FUTURE NOT NOW!!!!!
app.get('/', function(req, res, next){
  res.send("You did not send me anything");
});




app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db();
    const user = await db.collection('Users').findOne({ username, password });
    console.log('user:', user);

    if (user) {
      res.send('Login successful');
    } else {
      res.send('Invalid username or password');
    }

    client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



/*
//  How to grab data from a POST request
app.post('/post/users', function(req, res) {
  const formBody= req.body;
  var outstring='';
  for(var key in formBody) { outstring += "--" + key + ">" + formBody.key; }

  res.send('The formBody is: ' + JSON.stringify(formBody) + '<br>The outstring is: ' + outstring);
});
*/


// Using a local file to generate a web form (like post.html)
app.get("/getfile",function(req,res) {
  fs.readFile('Form.html','utf8',(err,data)=>{
    console.log(data)
    if(err){
      res.send('some err occured ',err);
    }
    res.send(data);
  })
})
