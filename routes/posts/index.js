var path = require('path');
//https://github.com/velopert/mongoose_tutorial/blob/master/routes/index.js
module.exports = function(app,User){

    app.get('/api/posts', function(req,res){
      res.send('This is /api/posts');
    });

    //게시글들 조회
    app.get('/api/posts/', function(req,res){
      res.send('/api/posts');
    });

    //게시글 상세조회
    app.get('/api/posts/:book_id', function(req,res){
      res.send('/api/posts');
    });

    //게시판 등록하는 API

    //게시판 수정하는 API

    //게시판 삭제하는 API

    //등등...


}
