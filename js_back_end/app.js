
const express=require('express');
const app=express();
const textDoc=require('./models/textDoc');
const mongoose=require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors())
app.use(express.urlencoded())
app.use(bodyParser.json());
app.listen(3000);

const url="mongodb+srv://zana:test4321@cluster0.dy5noxr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url)
.then(()=> console.log('Conncected'))
.catch(()=>console.log('Not connected'));

app.get('/',(req,res)=>
{
    res.send('Hello User!!');
}
)

app.post('/saveData',(req,res)=>{
    const dataR=req.body;
    //console.log(dataR.msg);
    //console.log(typeof(req));
   // console.log('----------')
    //console.log(typeof(req));
    //console.log(req.message);
    const newModel= new textDoc({contentDoc:dataR.msg,imageDoc:'Pic'});
    newModel.save()
    .then(()=>
        {
        res.json({'message':'Data saved successfully!'}) })
    .catch((err)=>console.log(err))
})



