import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import mysql from "mysql2"

const app = express()
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ProductList"
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/get",(req,res)=>{
    const sqlGet ="SELECT * FROM ProductInfo"
    db.query(sqlGet,(err,result)=>{
    res.send(result)
    })
})

app.post("/add", (req,res) =>{
   const {SKU, name, price , type, size, weight , height, length, width} = req.body
    const sqlInsert ="INSERT INTO ProductInfo (SKU, Name, Price, Type, Size, Weight, Height, Width, Length) VALUES (?,?,?,?,?,?,?,?,?)"
    db.query(sqlInsert,[SKU, name , price, type, size, weight, height, length, width ] ,(err,result)=>{
   if(err) {
       throw err
   }else console.log("data write")})

})

app.delete("/delete/:id",(req,res)=>{
 const {id} = req.params
    console.log(id)
    const sqlDelete = "DELETE FROM ProductInfo WHERE id = ?"
    db.query(sqlDelete, id,(err,result)=>{
        if(err) {
            throw err
        }else console.log("data delete")}

)
})

app.listen(5000, (err) =>{
    if(err){

        return console.log(err)
    }
    console.log("Server start at port 5000")
})