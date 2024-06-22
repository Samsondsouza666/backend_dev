import 'dotenv/config'
import logger from './logger.js';
import morgan from 'morgan';
import express from 'express'
const port = process.env.PORT || 3000
const  app = express()

const morganFormat = ':method :url :status :response-time ms';


app.use(express.json())


app.use(morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
  
        };
        logger.info(JSON.stringify(logObject));
      }
    }
  }));
const tea = []
let nextId =1;
app.post("/tea",(req,res)=>{
    // console.log(req.body)
    const temp = req.body
    
    temp.forEach(element => {
        // console.log(element)
        const {name,price} = element
        tea.push({id:nextId++,name,price})
    });

 
    res.send("data stored successfully")
})
app.get("/",(req,res)=>{
    send("hello worllddd!!!")
})
app.get("/getTeas",(req,res)=>{
    
    res.status(201).send(tea)
})

app.get("/:id",(req,res)=>{
    
    const queryId = req.params.id
    // console.log(queryId)
    let flag = 0
    tea.forEach(element =>{
        if(element.id === parseInt(queryId))
            res.send(element),flag=1
    })
    if(!flag) res.status(404).send("query data is not present")
})

app.put("/:id",(req,res)=>{
    const queryId = parseInt(req.params.id)
    let flag = 0
    tea.forEach((element,index) =>{
        if(element.id === parseInt(queryId))
            tea[index] = req.body,flag=1,res.status(200).send(tea[index])

        // console.log(index)
    })
    if(!flag) res.status(404).send("query data is not present")
    
})

app.delete("/:id",(req,res)=>{
    const queryId = parseInt(req.params.id)
    let flag = 0
    tea.forEach((element,index) =>{
        if(element.id === parseInt(queryId))
            tea.splice(index,1),flag=1,res.status(200).send(element)

        // console.log(index)
    })
    if(!flag) res.status(404).send("query data is not present")
    
})

// let a = 10**10
// console.log(a)
app.listen(port,()=>{
    console.log("listenning ........")
})