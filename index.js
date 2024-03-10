const express = require('express');
const Customer = require("./module/conn");
const path = require("path");
const app = express();
const port = 3000;

const staticPath = path.join(__dirname, "./public");
console.log(staticPath);
app.use(express.static(staticPath));

// Middleware
app.use(express.urlencoded({ extended: false }));

// View engine
app.set("view engine", "hbs");

app.get('/', (req, res) => {
  res.render('home');
});

app.get("/login", (req, res) => {
  res.render('login');
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/start", (req, res) => {
  res.render("start");
});

// Signup
app.post("/signup",async (req,res)=>{
  const data = new Customer({
    fname:req.body.fname,
    lname:req.body.lname,
    email:req.body.email,
    password:req.body.password
  })
  console.log(data);
  const regi = await data.save();
  res.render("login");
})

// Login

app.post("/login", async(req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Customer.findOne({email:email});
    if(useremail.password === password){
      res.render("home");
    }else{
      res.send("Invalid password");
    }
  } catch (error) {
    res.send(error);
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
