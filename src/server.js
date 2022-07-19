//CALL MODULES
const express = require("express")
const { Server:HttpServer }= require("http")
const { Server:IOserver }= require("socket.io")
const router = require('./routes/router')
const path = require('path')
const socketEventProduct = require("./sockets/products.socket")
const socketEventChat = require("./sockets/chat.socket")
const {engine} = require('express-handlebars')
const createTables = require("./script/createTables")

//INITIALIZATIONS
const app = express()
const httpServer = new HttpServer(app)
const io = new IOserver(httpServer)

//SETTINGS
app.engine("hbs",engine({
    extname:".hbs",
    defaultLayout: path.join(__dirname,"./views/layouts/main.hbs"),
    layoutsDir:  path.join(__dirname,"./views/layouts"),
    partialsDir: path.join(__dirname,"./views/partials")
}))


app.set("view engine",'hbs')
app.set("views", path.join(__dirname,"./views"))
app.set('port', process.env.PORT || 8080);
const PORT = app.get('port')

//STATIC FILES
app.use('/static', express.static(__dirname + '/public'));

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//SCRIPT
createTables()

//ROUTES
app.use('/',router)

socketEventProduct(io)
socketEventChat(io)

//SERVER
httpServer.listen(PORT,(err)=>{
    if(err){
        console.log(`server error: ${err}`)
    }
    console.log(`server listen port ${PORT}`)
})