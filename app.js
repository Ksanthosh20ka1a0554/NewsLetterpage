const express = require('express');
const request = require('request');
const bodyparser = require('body-parser');
const https = require('https');
const { read } = require('fs');
const app = express();

app.use(express.static('public'));

app.use(bodyparser.urlencoded({extended:true}));


app.get('/',function(req,res){
    res.sendFile(__dirname +'/signup.html');

    
});

app.post('/',function(req,res){
    var first_name = req.body.fname;
    var last_name =req.body.lname;
    var email = req.body.email;
    
    var data = {
        members:[{
            email_address:email,
            status:'subscribed',
            merge_fields:{
                FNAME: first_name,
                LNAME: last_name
            }
        }
    ]
    };

    const jsonData = JSON.stringify(data);

    const url = 'https://us21.api.mailchimp.com/3.0/lists/3d64ade3bb';

    const options = {
        method:'POST',
        auth:'santosh9515:dfe1b18887b3c5e1890f8500c74cbc44-us21'
    };

    const request = https.request(url,options,function(response){
        var code = response.statusCode;
        if(code === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on('data',function(data){
            console.log(JSON.parse(data));
            
        });
    });
    request.write(jsonData);
    request.end();
});

app.post('/failure',function(req,res){
    res.sendFile(__dirname+'/signup.html');
});










app.listen(3000);
//dfe1b18887b3c5e1890f8500c74cbc44-us21
//3d64ade3bb