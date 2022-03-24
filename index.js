const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');

// mongoose.connect('mongodb://localhost/user');
mongoose.connect('mongodb://127.0.0.1/user');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// create-userの設定
app.post('/api/v1/create-user', (req, res) =>{
    if (!req.body){
        return res.status(500).send('reqest body empty.');
    }

    const instance = new User();
    instance.name = req.body.name;
    instance.password = req.body.password;

    var obj = {name: req.body.name};
    User.find(obj, function(err, result){
        if(!result.length == 0) {
            var obj2 = {name: req.body.name, password: req.body.password};
            User.find(obj2, function(err, result2){
                if (!result2.length == 0) {
                    var data = {
                        items: [
                            {name: req.body.name},
                            {password: req.body.password}
                        ]
                    };
                    res.render(__dirname + '/index02.ejs', data);
                    // return res.json(result2);
                }
                else {
                    res.sendFile(__dirname + '/error.html');
                    // return res.status(200).send('正しいパスワードを入力してください！！');
                }
            });
        } else {
            instance.score = '0%';
            // MongoDBに保存
            instance.save(function(err){
                if(!err) {
                    res.sendFile(__dirname + '/registration.html');
                    // return res.status(200).send('登録できました！！');
                } else {
                    return res.status(500).send('user create faild.');
                }
            });
        }
    });
});

// get-all-userの設定
app.get('/api/v1/get-all-user', (req, res) =>{
    User.find(function(err, result){
        if(!err) {
            return res.json(result);
        } else {
            return res.status(500).send('get all user faild.');
        }
    });
});


app.post('/update', (req, res) =>{
    User.updateOne({name: req.body.name}, {$set: {score: req.body.score}}, function(err, result){
        console.log(req.body.name);
        if(!err) {
            var data = {
                items: [
                    {name: req.body.name},
                    {password: req.body.password},
                    {score: req.body.score}
                ]
            };
            res.render(__dirname + '/result.ejs', data);
            // return res.json(result);
        } else {
            return res.status(500).send('get all user faild.');
        }
    });
});


// const express = require('express');
// const app = express();
// const port = 3000;

// app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
})

app.get('/result', (req, res) => {
    res.sendFile(__dirname + '/result.html');
  })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// })



// イベント待機
app.listen(3000, () => console.log('Listening on port 3000'));