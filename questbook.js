var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8081

var guestbook = {
    dat: []
};

var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'html')))
loadGuestbook();


app.get('/', function(req, res){
    res.sendFile(__dirname + '/html/index.html');
})

app.get('/guestbook', function(req, res){
    res.send(guestbook);
})

app.post('/newmessage', function(req, res){
    let data = req.body;
    updateGuestbook(data);
    res.sendFile(__dirname + '/html/redirect.html');
})

app.post('/ajaxmessage', function(req, res){
    let data = req.body;
    updateGuestbook(data);
    res.send(guestbook);
})

app.get('/clearguestbook', function(req, res){
    guestbook.dat = [];
    saveGuestbook();
    res.send(guestbook);
})

var server = app.listen(port, function() {
    var _host = server.address().address
    var _port = server.address().port

    console.log("Server is running at "+_host+":"+_port)

})
  
function updateGuestbook(msg){
    guestbook.dat.push(msg);
    saveGuestbook();
}

function printGuestbook(){
    console.log("Heres a guestbook: ")
    for(let i = 0; i < guestbook.dat.length; i++){
        console.log(guestbook.dat[i])
    }
}

function loadGuestbook(){
    fs.readFile("data/guestbook.json", 'utf8', (err,data)=>{
        if(err || data.length < 5){console.error("Read failed. No file found"); return;}
        console.log("Read succeed")
        guestbook = JSON.parse(data)
        console.log("Guestbook loaded with " + guestbook.dat.length + " messages");
        printGuestbook();
    })
}

function saveGuestbook(){
    fs.writeFile("data/guestbook.json", JSON.stringify(guestbook), err => {if(err){console.error("File write failed")}console.log("File write succeed")})
}