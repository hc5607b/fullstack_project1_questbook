var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8081

var questbook = {
    dat: []
};

var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'html')))
loadQuestbook();


app.get('/', function(req, res){
    res.sendFile(__dirname + '/html/index.html');
})

app.get('/questbook', function(req, res){
    res.send(questbook);
})

app.post('/newmessage', function(req, res){
    let data = req.body;
    updateQuestbook(data);
    res.sendFile(__dirname + '/html/redirect.html');
})

app.post('/ajaxmessage', function(req, res){
    let data = req.body;
    updateQuestbook(data);
    res.send(questbook);
})

var server = app.listen(port, function() {
    var _host = server.address().address
    var _port = server.address().port

    console.log("Server is running at "+_host+":"+_port)

})
  
function updateQuestbook(msg){
    questbook.dat.push(msg);
    saveQuestbook();
}

function printQuestbook(){
    console.log("Heres a questbook: ")
    for(let i = 0; i < questbook.dat.length; i++){
        console.log(questbook.dat[i])
    }
}

function loadQuestbook(){
    fs.readFile("data/questbook.json", 'utf8', (err,data)=>{
        if(err || data.length < 5){console.error("Read failed. No file found"); return;}
        console.log("Read succeed")
        questbook = JSON.parse(data)
        console.log("Questbook loaded with " + questbook.dat.length + " messages");
        printQuestbook();
    })
}

function saveQuestbook(){
    fs.writeFile("data/questbook.json", JSON.stringify(questbook), err => {if(err){console.error("File write failed")}console.log("File write succeed")})
}