const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

//Schema

const SchemaData = mongoose.Schema({
    Firstname : String,
    Lastname : String,
    Email : String,
    Phone : String,
    Company : String,
    JobTittle : String,

},{
    timestamps : true
})


//model

const userModel = mongoose.model("user",SchemaData)


//API

//create api
//​http://localhost:8080/create
/*
{
    Firstname
    Lastname
    Email
    Phone
    Company
    Jodtittle
}
*/

app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()

    res.send({success : true,message : "data saved successfully", data : data})
})

//read api
//​http://localhost:8080

app.get("/",async(req,res)=>{
    const data = await userModel.find({})
    res.json({success : true , data : data}) 
})

//update api
//​http://localhost:8080/update

/*
{
    id:"",
    Firstname:"",
    Lastname:"",
    Email:"",
    Phone:"",
    Company:"",
    Jodtittle:""
}
*/

app.put("/update",async(req,res)=>{
    console.log(req.body)
    const{ _id,...rest} = req.body

    console.log(rest)
    const data = await userModel.updateOne({_id : _id},rest)

    res.send({success : true,message : "data will update successflly", data : data})
})

// delete api
//​http://localhost:8080/delete/id

app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : true,message : "data deleted successflly", data : data})

})


//DB Connection

mongoose.connect("mongodb://127.0.0.1:27017/curd")

.then(()=>{
    console.log("connected to DB")
    app.listen(PORT,()=>console.log("server is running"))
})
.catch((err)=>console.log(err))




