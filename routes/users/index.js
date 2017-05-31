var path = require('path');
var session = require('express-session');
//https://github.com/velopert/mongoose_tutorial/blob/master/routes/index.js
module.exports = function(app,User){
  var sess;
    app.use(session({
      secret: '@#$@#$TEAMNOMAD@!#@#$%',
      resave: false,
      saveUninitialized: true
    }));
    //GET USER LIST
    app.get('/api/users', function(req,res){
      User.find(function(err, users){
        if(err) return res.status(500).send({error: 'database failure. occured some error.'});
        console.log(users);
        res.json(users);
      });
    });
    //GET USER BY ID
    app.get('/api/users/:user_id', function(req,res){
      User.findOne({_id: req.params.user_id}, function(err, user){
          if(err) return res.status(500).json({error: err});
          if(!user) return res.status(404).json({error: 'book not found'});
          res.json(user);
      })
    });
    //ADD USER
    app.post('/api/users', function(req,res){
      var user  = new User();
      user.email = req.body.email;
      user.password = req.body.password;
      console.log(user);
      user.save(function(err){
          if(err){
            console.error(err);
            res.json({result: 0});
            return;
          }
          res.json({result: 1});
      });
    });
    //UPDATE USER
    app.put('/api/users/:user_id', function(req,res){
      User.findById(req.params.user_id, function(err, user){
          if(err) return res.status(500).json({error: 'database failure'});
          if(!user) return res.status(404).json({error: 'user not found'});
          if(req.body.email) user.email = req.body.email;
          if(req.body.password) user.password = req.body.password;
          user.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.json({message: 'user updated'});
          });
      });
    });
    //DELETE USER
    app.delete('/api/users/:user_id', function(req,res){
      User.remove({_id: req.params.user_id}, function(err, output){
        if(err) return res.status(500).json({error: "database failure"});
        res.status(204).end();
      });
    });
    //로그인
    //oAuth token을 리턴해줄것.
    app.post('/api/users/login', function(req,res){
      sess = req.session;
      User.findById(req.params.email, function(err, user){
        if(err) return res.status(500).json({error: 'database failure'});
        if(!user) return res.status(404).json({error: 'user not found'});
          if(req.body.password === user.password) {
            sess.email = user.email;
            res.json({message: 'login success'});
          }else{
            res.json({message: 'login failed'});
          }
      });
    });
    app.post('/api/users/logout',function(req,res){
      sess = req.session;
      if(sess.email){
          req.session.destroy(function(err){
            if(err){
              console.log(err);
            }else{
              res.redirect('/');
            }
          })
      }else{
        res.redirect('/');
      }
    });
    //회원가입
    app.post('/api/users', function(req,res){
      res.send('/api/users');
    });
    //oAuth token 검증하는 메소드 추가
    //등등...
}
