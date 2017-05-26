var path = require('path');

//https://github.com/velopert/mongoose_tutorial/blob/master/routes/index.js
module.exports = function(app,User){

    app.get('/api/users', function(req,res){
      res.send('This is /api/users');
    });

    //로그인
    //oAuth token을 리턴해줄것.
    app.post('/api/users/login', function(req,res){
      res.send('/api/users');
    });

    //회원가입
    app.post('/api/users', function(req,res){
      res.send('/api/users');
    });

    //oAuth token 검증하는 메소드 추가

    //등등...

}
