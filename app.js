const express = require('express');
const bodyParser = require('body-parser');
var nodemailer = require("nodemailer");

var app = express();
app.use(bodyParser.urlencoded({extended:false}));

var stmpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth:{
        user: 'tickat.vn@gmail.com',
        pass: 'thisispassword'
    }
});

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.post('/send', (req, res)=>{
    var mailOpts = {
        from: 'tickat.vn@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text:`
        From: tickat.vn

        ${req.body.message}
        
        --------------------------
        From tickat at ${new Date()}
        `
    };

    stmpTransport.sendMail(mailOpts, (error, response)=>{
        if(error)
            res.send("Can not send your mail");
        else res.send("Mail was sent");
    });
});

app.listen(3000, ()=>{
    console.log("App listening in port 3000");
});