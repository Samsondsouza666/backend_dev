const http  = require('http')

const hostname = '127.0.0.1'

const port = 3000

const server = http.createServer((req,res)=>{
    if (req.url=='/') {
        res.setHeader('Content-type','text/plain')
        res.statusCode = 200
        res.end("hello world !!")
    }
})


server.listen(port,hostname,()=>{
    console.log(`server listening in http://${hostname}/${port}`)
})

