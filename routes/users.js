const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const auth = require('../auth');
const router = express.Router();

router.post('/register', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err = new Error('Could not hash!');
            err.status = 500;
            return next(err);
        }
        User.create({
            fullName:req.body.fullName,
            address1:req.body.address1,
            address2:req.body.address2,
            address3:req.body.address3,
            phone:req.body.phone,
            mobilePhone:req.body.mobilePhone,
            email:req.body.email,
            password:hash,
            image:req.body.image
        }).then((user) => {
            let token = jwt.sign({
                _id: user._id
            }, "this is secret key");
            res.json({
                status: "Signup success!",
                token: token
            });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({
            email:req.body.email
        })
        .then((user) => {
            if (user == null) {
                let err = new Error("User not found!");
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({
                            _id: user._id
                        }, "secret message");
                        res.json({
                            status: 'Login success!',
                            token: token
                        });
                    }).catch(next);
            }

        }).catch(next);
})

router.get('/me',auth.verifyUser,(req,res,next)=>{
    res.json({
        _id:req.user._id,
        fullName:req.user.fullName,
        email:req.user.email,
        image:req.user.image
    });

});


router.get('/logout', function(req, res) {
    req.logout();
   res.status(200).json({
    status: 'Log Out!'
   });
  });


module.exports = router;