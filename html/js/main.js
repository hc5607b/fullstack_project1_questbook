var template
var paret

$(document).ready(function() {
    template = $(".element")
    paret = $(".table")
    template.remove();
    loadQuestbook();
});

$(document).on('click','.submit',function(){
    if(!document.forms["dataform"]["username"].value || !document.forms["dataform"]["country"].value || !document.forms["dataform"]["message"].value){console.log("Invalid data"); alert("All fields need to be filled!"); return;}
    $.post("/ajaxmessage",
    {
        username: document.forms["dataform"]["username"].value,
        country: document.forms["dataform"]["country"].value,
        message: document.forms["dataform"]["message"].value
    },function(data, status){
        if(status != "success"){console.error("Data update failed"); return;}
        clearQuestbook();
        printQuestbook(data);
        document.forms["dataform"]["username"].value = "";
        document.forms["dataform"]["country"].value = "";
        document.forms["dataform"]["message"].value = "";
    })
});

function loadQuestbook(){
    $.get("/questbook", function(data, status){
        if(status != "success"){console.error("Questbook load failed"); return;}
        printQuestbook(data);
    })
}

function clearQuestbook(){
    paret.html("");
}

function testprint(){
    printQuestbook(JSON.parse('{"dat":[{"username":"matti","country":"jooo","message":"moi"},{"username":"pertti","country":"jooo","message":"moi"},{"username":"teemu","country":"jooo","message":"moi"},{"username":"paavo","country":"perse","message":"lol"},{"username":"pertti","country":"joo","message":"moikka"},{"username":"sda","country":"wda","message":"sdaw"},{"username":"dwasd","country":"awdasd","message":"wadsdadw"},{"username":"","country":"","message":""},{"username":"","country":"","message":""},{"username":"","country":"","message":""},{"username":"","country":"","message":""},{"username":"sadw","country":"awd","message":"sda"},{"username":"sadw","country":"awd","message":"sda"},{"username":"sadw","country":"awd","message":"sda"},{"username":"sadw","country":"awd","message":"sda"},{"username":"sadw","country":"awd","message":"sda"},{"username":"sadw","country":"awd","message":"sda"},{"username":"sadw","country":"awd","message":"sda"},{"username":"sadw","country":"awd","message":"sda"},{"username":"sadw","country":"awd","message":"sda"},{"username":"sadw","country":"awd","message":"sda"},{"username":"sadw","country":"awd","message":"sda"}]}'))
}

function printQuestbook(data){
    for(let i = Object.keys(data.dat).length -1; i>=0; i--){
        let ins = template.clone()
        ins.find(".id1").html(data.dat[i].username);
        ins.find(".id2").html(data.dat[i].country);
        ins.find(".id3").html(data.dat[i].message);
        paret.append(ins)
    }
}