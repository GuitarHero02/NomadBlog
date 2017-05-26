var path = require('path');

module.exports = function(app){

    app.get('/', function(req,res){
      res.sendFile(path.join(__dirname + '/../static/html/index.html'));
    });

    //Client Page는 여기서 작업

}
