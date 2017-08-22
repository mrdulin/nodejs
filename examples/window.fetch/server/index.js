const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const util = require('util');
const formidable = require('formidable');

const port = 8080;
const clientPath = path.resolve(__dirname, '../client');
const node_modules = path.resolve(__dirname, '../../../node_modules');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(clientPath))
app.use('/lib', express.static(node_modules));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/getCity', (req, res) => {
    const city = {
        shanghai: '上海',
        shenzhen: '深圳',
        beijing: '北京',
        hangzhou: '杭州'
    };
    res.status(200).json(city);
});

app.post('/login', (req, res) => {
    const json = {};
    console.dir(req.body);
    //fetch JSON形式
    json.user = req.body.username;

    //fetch FormData形式
    /*
    ------WebKitFormBoundary4Q1naZ8gTf7YHoOx
    Content-Disposition: form-data; name="user[name]"

    novaline
    ------WebKitFormBoundary4Q1naZ8gTf7YHoOx
    Content-Disposition: form-data; name="user[password]"

    123
    ------WebKitFormBoundary4Q1naZ8gTf7YHoOx--
    */
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        res.status(200).json({user: fields['user[name]']});
    });

});


app.get('/getImg', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/avatar.jpg'));
});

app.listen(port, (err) => {
    if(err) {
        process.stdout.write(`error: ${err.message}`);
    } else {
        process.stdout.write(`The server is listen on port ${port} \n`);
    }
});
