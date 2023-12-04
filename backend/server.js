let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
const path = require('path');
let bodyParser = require('body-parser');
const dotenv=require("dotenv")
dotenv.config();
 const connectDB = require('./database/db');

 

const userRoutes = require("./routes/user.route")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/users', userRoutes);


//static production asset
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"frontend","build")));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
  })
}




// PORT //
const PORT = process.env.PORT ||4000;
connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests",PORT);
  })
})

  // 404 Error
app.use((req, res, next) => {
    res.status(404).send('Error 404!')
    
  });

  app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });