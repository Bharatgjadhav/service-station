const bodyParser= require("body-parser")
express = require("express")
app.use(bodyParser.urlencoded({extended: false}))

const sqlite3=require("sqlite3").verbose()
const db= new sqlite3.Database("./service-station.db",(err)=>{
    if(err)
    console.log("error in opening db    ")
    else
    {
        console.log("db connected")
        db.run(`CREATE TABLE OF NOT EXISTS USERS(USER_ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                                  NAME VARCHAR(30) NOTNULL,
                                                  PHONE VARCHAR(10) UNIQUE NOT NULL,
                                                  GENDER VARCHAR(2) NOTNULL,
                                                  EMAIL_ID VARCHAR(30) NOTNULL,
                                                  ADDRESS VARCHAR(50) NOTNULL,
                                                  PASSWORD VARCHAR(10) NOTNULL)`,
                (err)=> {
                                if(err)
                                     console.log("could not create table",err)
                                else{
                                     console.log("table  created successfully ")
                                     }
                         })
    }
})
app.set("views","./views")
app.set("view engine","ejs");
let port=5000

app.get("/",(req, res)=>{
    res.render("index")
})

app.get("/home",(req, res)=>{
    res.render("home")
})

app.get("/addusers",(req, res)=>{
    res.render("addusers",{status:0})

})

app.post("/users",(req,res)=>{
    console.log("inside")
    user_id = req.body.user_id
    name  = req.body.name
    phone = req.body.phone
    gender = req.body.gender
    email_id = req.body.email_id
    address = req.body.address
    password = req.body.password
        db.run("INSERT INTO USERS(USER-ID,NAME,PHONE,GENDER,EMAIL-ID,ADDRESS,PASSWORD) VALUES(?,?,?,?,?,?,?)",[NULL, NAME,
                    PHONE,GENDER,EMAIL-IDBCursor,ADDRESS,PASSWORD], (err)=>{
                        if(err){
                            console.log(err)
                            res.status(5000).render("addusers",{status : err})
                        }
                        else{
                            res.status(200).render("addusers",{status: "success"})
                        }
                    })
})

app.get("/", (req,res)=>{      /* display users page */
        db.all("select *from users",(err, rows)=>{
            console.log(rows)
            if(err)
                res.render("showusers",{status: err})

            res.render("showusers",{showusers:rows})
        })
})  

app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})