const express = require('express');
const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());

app.get('/', function(req, res, next){
 if (req.cookies.myCookie) {
  return res.redirect('/result');
 } 
 else {
  return res.redirect('/Form');
 }
});




app.post('/register', async (req, res, ) => {
const dataToInsert = { newUsername, newPassword } = req.body;
 try {
  const client = await MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 });

 
   
      

        const database = client.db("MyDBexample");
        const collection = database.collection("Users");

        // Insert one document into the collection
        const result = await collection.insertOne(dataToInsert);
        console.log(`Inserted ${result.insertedCount} document into the collection`);
    } catch (error) {
        console.error("Error adding data to collection:", error);
    } finally {
        await client.close();
        //console.log("Disconnected from MongoDB");
    }

});












app.post('/login', async (req, res, next ) => {
 const { username, password } = req.body;
 try {
  const client = await MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 });

 const db = client.db("MyDBexample");
 const user = await db.collection('Users').findOne({ username, password });
 //console.log('user:', user);

 if (user) {
  const expiryDate = new Date(Date.now() + 45 * 1000);
  res.cookie('myCookie', 'Ice-Cream', { expires: expiryDate });
  res.send("Ready To Roll")
  next();
 } 
 else {
  res.send('Invalid username or password');
 }

 client.close();
 } 
 catch (err) {
  console.error(err);
  res.status(500).send('Internal Server Error');
 }
});

app.get('/login-success', (req, res) => {
  res.redirect('/result');
});



app.get("/result",function(req,res) {
 fs.readFile('result.html','utf8',(err,data)=>{
 if(err) {
  res.send('some err occured ',err);
 }
 res.send(data);
 })
})

app.get("/Form",function(req,res) {
 fs.readFile('Form.html','utf8',(err,data)=>{
 if(err) {
  res.send('some err occured ',err);
 }
 res.send(data);
 })
})