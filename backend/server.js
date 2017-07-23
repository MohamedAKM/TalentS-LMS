var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
//require multer for the file uploads
var multer = require('multer');
var fs = require('fs');
var http = require('http');
var contentDisposition = require('content-disposition');
var nodemailer = require('nodemailer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

var api = express.Router();
var auth = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sabic',
  debug: ['ComQueryPacket', 'RowDataPacket']
});


// set the directory for the uploads to the uploaded to
var DIR = './uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR,
                    fileFilter : function(req, file, callback) { //file filter
                        if (['xls', 'xlsx','pdf','doc','docx','ppt','ppt'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                            return callback(new Error('Wrong extension type'));
                        }
                        callback(null, true);
                    }}).single('file');
var request = require('request');

api.post('/send/sms', (req, res) => {
  // Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/json'
}

  var values = {
  "Data": {
    "Method": "msgSend",
    "Params": {
      "sender": "0592288856",
      "msg": "SMS notification via lms :)",
      "numbers": "999",
      "dateSend": "0",
      "timeSend": "0",
      "deleteKey": "55348",
      "msgId": "0",
      "lang": "3",
      "applicationType": "65",
      "domainName": "mywebsite.com"
    },
    "Auth": {
      "mobile": "demo",
      "password": "demo"
    }
  }
}

// Configure the request
var options = {
    url: 'http://www.mobily.ws/api/json/',
    method: 'POST',
    headers: headers,
    body: JSON.stringify(values)
}

// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
    }
})

})

api.post('/send/email', (req, res) => {
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'email',
        pass: 'pass'
      }
    });

    var mailOptions = {
      from: 'from',
      to: 'to',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
  });
})
api.get('/file/:id', (req, res) => {
    try {

      var id = req.params.id;
      var user,course;
      connection.query('select * from files as files where id="'+id+'"', function (err, rows, fields) {
        if (err) throw err

          result = rows[0];
          console.log(result);
          if (!result) {
              res.sendStatus(404);
              return;
          };

          res.setHeader('Content-Type', result.mimetype);
          res.setHeader('Content-Disposition', contentDisposition(result.filename));

       //   res.setHeader( 'Content-Disposition', 'attachment;filename='+ result.filename );
          fs.createReadStream(result.filepath).pipe(res);
      })
    } catch (err) {
        res.sendStatus(400);
    }

})

//our file upload function.
api.post('/upload', function (req, res, next) {
     var exceltojson; //Initialization
     var path = '';
     upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
            res.status(422).send("an Error occured")
        }  
       // No error occured.

              /** Multer gives us file info in req.file object */
            if(!req.file){
                return res.json({error_code:1,err_desc:"No file passed"});
                
            }
       //start convert process
            /** Check the extension of the incoming file and 
             *  use the appropriate module
             */
            if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            try {
                return exceltojson({
                    input: req.file.path, //the same path where we uploaded our file
                    output: null, //since we don't need output.json
                    lowerCaseHeaders:false
                }, function(err,result){
                    if(err) {
                        return res.json({error_code:1,err_desc:err, data: null});
                    } 
                    console.log(result[0]);
                   for (var i = 0; i < result.length ; i++) {
                     result[i]
                   
                    result[i].fullName = result[i].n1+" " + result[i].n2 + " " + result[i].n3; 
                    delete result[i].n1; 
                    delete result[i].n2; 
                    delete result[i].n3; 
                    result[i].groupid=4;
                    result[i].email=result[i].email.toLowerCase();
                    //result[0].ssn = null; 
    var query = connection.query('INSERT INTO users SET ?', result[i], function (error, results, fields) {
          if (error) throw error;
          // Neat!
        });
  }
                    return res.json({error_code:0,err_desc:null, data: result});
                });
            } catch (e){
                return res.json({error_code:1,err_desc:"Corupted excel file"});
            }

       // path = req.file.destination + req.file.filename;
       // console.log(req.file);
      //var query = connection.query("INSERT INTO `files` (`id`, `filename`, `filepath`,`mimetype`,`size`, `userid`, `courseid`) VALUES (NULL, '"+req.file.originalname+"', '"+path+"','"+req.file.mimetype+"','"+req.file.size+"', 'talent', '"+req.body.courseid+"')", function (error, results, fields) {
      //if (error) throw error;

      // Neat!
      
   // });
      // return res.json({error_code:1,err_desc:"file uploaded"});
  });     
     
     //console.log( req );
})

api.get('/messages', (req, res) => {
    connection.query('select * from users as users', function (err, rows, fields) {
      if (err) throw err

        console.log('The solution is: ', rows)
        res.json(rows);
    })
})
api.get('/groups', (req, res) => {
    connection.query('select * from groups as groups', function (err, rows, fields) {
      if (err) throw err

        console.log('The solution is: ', rows)
        res.json(rows);
    })
})
api.get('/courses', (req, res) => {
    var token = req.header('authorization').split(' ')[1];

    var username = jwt.decode(token, '123'); 
    connection.query('select * from users as users where ssn="'+username+'"', function (err, rows, fields) {
      if (err) throw err
        var groupid = rows[0].groupid; 
        if (groupid==1 || groupid==2) {sql="select * from courses"}
        if (groupid==3) {sql="select * from courses where userid='"+username+"'"}
        if (groupid==4) {sql='select * from courses INNER JOIN participants ON courses.code=participants.courseid where participants.userid="'+username+'"'}
          connection.query(sql, function (courseserr, courses, coursesfields) {
             res.json(courses);
          })
        console.log(sql);
    })

   
})


api.post('/assign', (req, res) => {
    //var token = req.header('authorization').split(' ')[1];

   // var username = jwt.decode(token, '123'); 
  connection.query('select * from participants as participants where userid="'+req.body.userid+'" and courseid="'+req.body.courseid+'"', function (err, rows, fields) {
    if (rows[0]) {
      return res.json({ success: false, message: 'The user is already studying in this course' });
    }else{
       var query = connection.query('INSERT INTO participants SET ?', [req.body], function (error, results, fields) {
      if (error) throw error;

      // Neat!
    });
    }
  
  })
    //return res.json({ success: false, message: 'ID or password incorrect' });
     
})

api.post('/mark-attend', (req, res) => {
    //var token = req.header('authorization').split(' ')[1];

   // var username = jwt.decode(token, '123'); 

  connection.query('select * from participants as participants where userid="'+req.body.userid+'" and courseid="'+req.body.courseid+'"', function (err, rows, fields) {
    if (!rows[0]) {
      return res.json({ success: false, message: 'The user is not registered on this course' });
    }else{
      var date = new Date();
      var current_hour = date.getHours()+':'+ date.getMinutes();
      var newattend = [{userid:''+req.body.userid+'', courseid:req.body.courseid,attend_time:current_hour}];

      var query = connection.query('INSERT INTO attendance SET ?',newattend, function (error, results, fields) {
      if (error) throw error;
            return res.json({ success: true, message: 'User was marked as present' });

      // Neat!
      });
    }
  
  })
    //return res.json({ success: false, message: 'ID or password incorrect' });
     
})
api.post('/course', (req, res) => {
        var query = connection.query('INSERT INTO courses SET ?', req.body, function (error, results, fields) {
          if (error) throw error;
          // Neat!
        });
    console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
    res.json(req.body);
})
api.get('/course/:code', checkAuthenticated, (req,res) => {
    var code = req.params.code;
    var user,course;
    connection.query('select * from courses as courses where code="'+code+'"', function (err, rows, fields) {
      if (err) throw err

      

    connection.query('select fullName from courses as courses inner join participants p on p.courseid = courses.code inner join users u on u.ssn = p.userid where courses.code="'+code+'"', function (stderr, students, stdfields) {
        if (err) throw err
        course = rows[0];
        course.trainees = students;
       res.json(course);
    })
//res.json(course);
        

    })
})
api.get('/files/:code', checkAuthenticated, (req,res) => {
    var code = req.params.code;
    var files;
    connection.query('select * from files as files where courseid="'+code+'"', function (err, rows, fields) {
      if (err) throw err

       res.json(rows);

    })
})

api.get('/categories_list', (req, res) => {

    connection.query('select * from course_category as categories', function (err, rows, fields) {
      if (err) throw err

        console.log('The solution is: ', rows)
        res.json(rows);
    })
   
})
api.get('/attendance', (req, res) => {
    var token = req.header('authorization').split(' ')[1];

    var username = jwt.decode(token, '123'); 
    connection.query('select * from users as users where ssn="'+username+'"', function (err, rows, fields) {
      if (err) throw err
        var groupid = rows[0].groupid; 
        if (groupid==1 || groupid==2) {sql="select * from attendance INNER JOIN courses ON courses.code=attendance.courseid INNER JOIN users ON users.ssn=attendance.userid order by attend_time desc"}
        if (groupid==3) {sql="select * from attendance INNER JOIN courses ON courses.code=attendance.courseid INNER JOIN users ON users.ssn=attendance.userid where courses.userid='"+username+"'"}
        if (groupid==4) {sql="select * from attendance INNER JOIN courses ON courses.code=attendance.courseid INNER JOIN users ON users.ssn=attendance.userid where users.ssn='"+username+"'"}
          connection.query(sql, function (courseserr, courses, coursesfields) {
             res.json(courses);
          })
        console.log(sql);
    })
})
api.get('/weekly', (req, res) => {
        var token = req.header('authorization').split(' ')[1];

    var username = jwt.decode(token, '123'); 
    connection.query('select * from users as users where ssn="'+username+'"', function (err, rows, fields) {
      if (err) throw err
        var groupid = rows[0].groupid; 
        if (groupid==1 || groupid==2) {sql="select * from attendance INNER JOIN courses ON courses.code=attendance.courseid INNER JOIN users ON users.ssn=attendance.userid"}
        if (groupid==3) {sql="select * from attendance INNER JOIN courses ON courses.code=attendance.courseid INNER JOIN users ON users.ssn=attendance.userid where courses.userid='"+username+"'"}
        if (groupid==4) {sql="select * from courses INNER JOIN participants p ON courses.code=p.courseid INNER JOIN users ON users.ssn=p.userid where users.ssn='"+username+"'"}
          connection.query(sql, function (courseserr, courses, coursesfields) {
             res.json(courses);
          })
        console.log(sql);
    })
})
api.get('/messages/:user', (req, res) => {
    var user = req.params.user;
    var result = messages.filter(message => message.owner == user);

    res.json(result);
})

api.post('/messages', (req, res) => {
    messages.push(req.body);
    res.json(req.body);
})


api.post('/attend', (req, res) => {
    var date = new Date();
var current_hour = date.getHours()+':'+ date.getMinutes();
      var newattend = [{userid:''+req.body.ssn+'', courseid:'EN101',attend_time:current_hour}];
     var query = connection.query('INSERT INTO attendance SET ?',newattend, function (error, results, fields) {
          if (error) throw error;
          // Neat!
          res.json(newattend);
        });
    
})
api.get('/users/me', checkAuthenticated, (req,res) => {
    var user;
    connection.query('select * from users as users where ssn="'+req.user+'"', function (err, rows, fields) {
      if (err) throw err

        user = rows[0];

         res.json(user);

    })
})
api.get('/users/profile', checkAuthenticated, (req,res) => {
    var user;
    connection.query('select * from users as users where ssn="'+req.body.ssn+'"', function (err, rows, fields) {
      if (err) throw err

        user = rows[0];

         res.json(user);

    })
})  
api.get('/users/profile/:ssn', checkAuthenticated, (req,res) => {
    var ssn = req.params.ssn;
    var user;
    connection.query('select * from users as users where ssn="'+ssn+'"', function (err, rows, fields) {
      if (err) throw err

        user = rows[0];

         res.json(user);

    })
})
api.get('/users/edit/:ssn', checkAuthenticated, (req,res) => {
    var ssn = req.params.ssn;
    console.log(req.body);
      var query = connection.query("UPDATE users SET fullName = :fullName,dob = :dob,interest = :interest,education = :education,mobile = :mobile,fatherMobile,fatherMobile = :fatherMobile,location = :location,bloodType = :bloodType, gender = :gender, medicalCondition=:medicalCondition,bio=:bio where ssn='"+req.body.ssn+"'", [ req.body ], function (error, results, fields) {
      console.log(query);
      if (error) throw error; 
            return res.json({ success: true, message: 'User was marked as present' });

      // Neat!
      });
    res.json(user);

})
api.post('/users/delete', checkAuthenticated, (req,res) => {
    var user = req.body.ssn;
    connection.query('DELETE FROM users WHERE ssn = "'+user+'"', function (error, results, fields) {
    if (error) throw error;
      console.log('deleted ' + results.affectedRows + ' rows');
      res.json(user);
    })
    
})

api.post('/users/me', checkAuthenticated, (req,res) => {
  // var ssn = req.params.ssn;
    console.log(req.body.fullName);
     var addPass="";
      if (req.body.password.length > 0 ) {
        addPass = ",password='"+req.body.password+"'";
      }
      var query = connection.query("UPDATE users SET fullName = '"+req.body.fullName+"',dob = '"+req.body.dob+"',interest = '"+req.body.interest+"',education = '"+req.body.education+"',mobile = '"+req.body.mobile+"',fatherMobile = '"+req.body.fatherMobile+"',location = '"+req.body.location+"',bloodType = '"+req.body.bloodType+"',gender = '"+req.body.gender+"',medicalCondition = '"+req.body.medicalCondition+"',bio = '"+req.body.bio+"'"+addPass+" where ssn='"+req.body.ssn+"'", function (error, results, fields) {
      console.log(query);
      if (error) throw error; 
            //return res.json({ success: true, message: 'User was marked as present' });
        console.log(req.body.fullName);
         res.json(req.body);
      });


})

auth.post('/login', (req, res) => {
    var user;
    connection.query('select * from users as users where email="'+req.body.ssn+'"', function (err, rows, fields) {
      if (err) throw err

      //  console.log('The solution is: ', rows)
        user = rows[0];
       // res.json(rows);

       console.log(user);
    if (!user) 
        sendAuthError(res);

    if (user.password == req.body.password || user.password == null)
        sendToken(user, res);
    else
        sendAuthError(res);

    })


})

auth.post('/register', (req, res) => {
    var query = connection.query('INSERT INTO users SET ?', req.body, function (error, results, fields) {
          if (error) throw error;
          // Neat!
        });
    console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
    res.json(req.body);
})

function sendToken(user, res) {
    var token = jwt.sign(user.ssn, '123');
    res.json({ ssn: user.ssn, token });
}

function sendAuthError(res) {
    return res.json({ success: false, message: 'ID or password incorrect' });
}

function checkAuthenticated(req, res, next) {
    if(!req.header('authorization'))
        return res.status(401).send({message: 'Unauthorized requested. Missing authentication header'});

    var token = req.header('authorization').split(' ')[1];

    var payload = jwt.decode(token, '123');
    console.log('decode: '+payload);
    if(!payload)
        return res.status(401).send({message: 'Unauthorized requested. Authentication header invalid'});

    req.user = payload;

    next();
}

app.use('/api', api);
app.use('/auth', auth);


app.listen(1234);