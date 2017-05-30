var path = require('path');
var public = __dirname + "/../public/";

module.exports = function(app){

    app.get('/', function(req,res){
      res.sendFile(path.join(public + "html/index.html"));
    });

    //Client Page는 여기서 작업

}
