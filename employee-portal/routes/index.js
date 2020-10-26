var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

var jobOpeningModel = require('../model/job-opening');
var jobOpening = jobOpeningModel.find({});


var router = express.Router();

/* GET users listing. */
router.get('/user', function(req, res, next) {
  res.send('respond with a resource');
});


/* POST user sign-up*/
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

router.get('/about', function (req, res, next) {
  res.render('pages/about');
});


router.get('/', function (req, res, next) {
  res.render('pages/role');
});

router.get('/login', function (req, res, next) {
  res.render('pages/login');
});

router.get('/register', function (req, res, next) {
  res.render('pages/register');
});



router.get('/job-opening/all', function (req, res, next) {
  jobOpening.exec(function (err, data) {
    if (err) throw err;
    res.render('pages/listOfJobOpening', { title: 'Employee Portal', jobOpenings: data });
  });
});


/* Manager APIs*/
router.get('/job-opening/create', function (req, res, next) {
  res.render('pages/createJobOpening');
});


router.post('/job-opening/create', function (req, res, next) {
  const data = req.body;
  console.log(data);
  var jobOpeningData = new jobOpeningModel({
    projectName: data.projectName,
    clientName: data.clientName,
    roleName: data.roleName,
    jobDescription: data.jobDescription,
    technologyStack: data.technologyStack,
    status: data.status,
    createdBy: data.createdBy
  });
  console.log(jobOpeningData);
  jobOpeningData.save();
  jobOpening.exec(function (err, data) {
    if (err) throw err;
    res.render('pages/listOfJobOpening', { title: 'Employee Portal', jobOpenings: data });
  }); 
});

router.get('/job-opening/update/:id', function (req, res, next) {
  console.log("id: " + req.params['id']);
  var id = req.params['id'];
  var jobOpeningById = jobOpeningModel.find({ "_id": id });
  jobOpeningById.exec(function (err, jobOpeningData) {
    if (err) throw err;
    console.log("get data to be updated: " + JSON.stringify(jobOpeningData[0]));
    res.render('pages/updateJobOpening', { data: jobOpeningData[0] });
  });

});

router.post('/job-opening/update', function (req, res, next) {
  console.log("update data: ");
  const data = req.body;
  console.log(data);
  const _id = data.id;
  console.log(_id);

if (_id.match(/^[0-9a-fA-F]{24}$/)) {
  jobOpeningModel.findByIdAndUpdate({ _id }, {
    "projectName": data.projectName,
    "clientName": data.clientName,
    "roleName": data.roleName,
    "jobDescription": data.jobDescription,
    "technologyStack": data.technologyStack,
    "status": data.status,
    "createdBy": data.createdBy
    }, function (err, result) {
      if (err) throw err;  
     
      jobOpening.exec(function (err, data) {
        if (err) throw err;
        res.render('pages/listOfJobOpening', { title: 'Employee Portal', jobOpenings: data });
      }); 
    });
  }

});

module.exports = router;
