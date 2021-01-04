const bodyParser= require("body-parser")
let express = require("express")
let app =express()
app.use(bodyParser.urlencoded({extended: false}))

const sqlite3=require("sqlite3").verbose()
const db= new sqlite3.Database("./service-station.db",(err)=>{
    if(err)
    console.log("error in opening db")
    else
    {
        console.log("db connected")
        db.run(`CREATE TABLE IF NOT EXISTS USERS(USER_ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                                  NAME VARCHAR(30) NOT NULL,
                                                  PHONE VARCHAR(15) UNIQUE NOT NULL,
                                                  GENDER VARCHAR(2) NOT NULL,
                                                  EMAIL_ID VARCHAR(30) NOT NULL,
                                                  ADDRESS VARCHAR(50) NOT NULL,
                                                  PASSWORD VARCHAR(10) NOT NULL)`,
                (err)=> {
                                if(err)
                                     console.log("could not create table",err)
                                else{
                                     console.log(" USER table  created successfully ")
                                     }
                         })
        db.run(`CREATE TABLE IF NOT EXISTS SERVICE (MECHANIC_ID INTEGER PRIMARYKEY AUTO INCREMENT,
                                                   VEHICLE_NUMBER VARCHAR(25) UNIQUE NOT NULL, 
                                                   SERVICE_DETAIL VARCHAR(100) NOT NULL,
                                                   DATE VARCHAR(10) NOT NULL)`,
                                            (err)=>{
                                                if(err)
                                                console.log("could not create table",err)
                                                else{
                                                    console.log(" service table created successfully")
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
app.get("/service",(req,res)=>{
    res.render("service",{status:1})
})

app.post("/addusers", (req, res)=>{
    console.log("INSIDE")
    let user_id = req.body.user_id
    let name  = req.body.name
    let phone = req.body.phone
    console.log(phone);
    let gender = req.body.gender
    let email_id = req.body.email_id
    console.log(email_id)
    let address = req.body.address
    let password = req.body.password
        db.run("INSERT INTO USERS(USER_ID,NAME,PHONE,GENDER,EMAIL_ID,ADDRESS,PASSWORD) VALUES(?,?,?,?,?,?,?)",
        [user_id, name, phone, gender, email_id, address, password],(err)=>{
                        if(err){
                            console.log(err)
                            res.status(500).render("addusers",{status : err})
                        }
                        else{
                            res.status(200).render("addusers",{status: "success"})
                        }
                    })
})
app.post("/service",(req,res)=>{
    console.log("inside service")
    let Mechanic_Id =req.body.Mechanic_Id
    let Vehicle_Number=req.body.Vehicle_Number
    let Service_Detail=req.body.Service_Detail
    let Date=req.body.Date
        db.run("INSERT INTO SERVICE(MECHANIC_ID,VEHICLE_NUMBER,SERVICE_DETAIL,DATE) VALUES(?,?,?,?)",
        [Mechanic_Id,Vehicle_Number,Service_Detail,Date], (err)=>{
            if(err){
            console.log(err)
            res.status(500).render("service",{status : err})
            }
        
        else{
            res.status(200).render("service",{status:"success"})
        }
    })
})

app.get("/users", (req, res)=>{      /* display users page */
        db.all("select *from users",(err, rows)=>{
            console.log(rows)
            if(err)
                res.render("users",{status: err})

            res.render("users",{showusers :rows})
        })
})  

app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})