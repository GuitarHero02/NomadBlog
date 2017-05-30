var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var path = require('path');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect(process.env.NOMAD_DB_BLOG_DEV);

var User = require('./models/user');
var Post = require('./models/post');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;

// [CONFIGURE ROUTER]
var index = require('./routes')(app);
var users = require('./routes/users')(app,User);
var posts = require('./routes/posts')(app,Post);

// [CONFIGURE STATIC]
app.use(express.static(path.join(__dirname, 'public')));

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});
