const   express     = require('express'),
        bodyParser  = require('body-parser'),
        fs          = require('fs');
        app         = express(),
        path        = require('path')
        port        = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.get('/getbooks', (req, res) => {
    console.log(`send books.json`);
    res.sendFile(`${__dirname}/db/books.json`);
});

app.use('/savejson',(req,res) => {
    
    
    let str = req.body.str
    console.log(JSON.stringify(str))
    fs.writeFile('./db/books2.json',JSON.stringify(str),(err)=>{
        if(err)
            res.send({Error : "can't save file"})
        res.sendFile(`${__dirname}/db/books2.json`);
    })
})

app.listen(port);
console.log(`listening on port ${port}`);


