
const express = require('express');
const bodyParser = require("body-parser");
const shell = require("shelljs");

const app = new express();

//const expressReactViews = require('express-react-views');
// const jsxEngine = expressReactViews.createEngine();
// app.set('view engine', 'jsx');
// app.set('views', 'views');
// app.engine('jsx', jsxEngine);

var itemRouter = express.Router()

itemRouter.use(function (req, res, next) {
    console.log('Item query Time:', Date())
    next()
})

itemRouter.get('/:id', function (req, res, next) {
    res.send("Item " + req.params.id + " last enquiry " + Date())
})

const path = require('path');

// serve your css as static
app.use(express.static(path.join(__dirname + '/views/')));

app.get("/", (req, res) => {
    //__dirname : It will resolve to your project folder.
    res.sendFile(path.join(__dirname + '/views/index.html'));
    //res.render('index', { name: req.params.name });
});

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/result", (req, res) => {
    var ip = req.body.ip
    var password = req.body.password;
    var apt_source="";
    switch (req.body.source) {
        case "1":
            apt_source = "repo.huaweicloud.com";
            break;
        case "2":
            apt_source = "mirrors.tuna.tsinghua.edu.cn";
            break;
        case "3":
            apt_source = "mirrors.aliyun.com";
            break;
    }
    var driver="";
    switch (req.body.driver) {
        case "1":
            driver = "470";
            break;
        case "2":
            driver = "465";
            break;
        case "3":
            driver = "460";
            break;
    }
    var docker=req.body.docker;
    if(req.body.docker==undefined){
        docker="no"
    }else{
        docker="yes"
    }
    var firstline="IP: " + ip + " | root password: " + password + " | APT Source: " + apt_source+ " | NV Driver: " + driver+ " | Install docker or not: " + docker+"\n";
    
    var output=shell.exec("git --version")
    
    shell.exec('git --versionfuck', function(code, stdout, stderr) {//some_long_running_process
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
      });
    
    res.send(output);
});

app.use('/item', itemRouter)

app.listen(3333, () => {
    console.log(`Listening at http://localhost:3333`)
})

