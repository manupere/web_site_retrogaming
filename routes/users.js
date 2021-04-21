const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();


//Download model Users
require('../models/Users');
const User = mongoose.model('users');


// Method GET  Login user
router.get('/login', (req, res)=> {
    res.render('users/login');
});

// Method GET  register user
router.get('/register', (req, res)=> {
    res.render('users/register');
});


// Method POST register form
router.post('/register', (req, res)=> 
{
      
    let errors=[];
    
    if(req.body.password != req.body.password2)
    {
        errors.push({text: 'Le password doit être le même'});
    }

    if(req.body.password.length < 4){
        errors.push({text: 'Le password doit contenir au moins 4 caractères'});
    }

    if(errors.length > 0){
        res.render('users/register', {
             errors: errors,
             name: req.body.name,
             email: req.body.email,
             password: req.body.password,
             password2: req.body.password2
        });
    } else{
        User.findOne({ email: req.body.email})
              .then(user => {
                  if(user){
                      req.flash('error_msg', 'Email déjà enregistré');
                      res.redirect('/users/register');
                  }else{
                    const newUser = new User( {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    });
                    //console.log(newUser);
                    bcrypt.genSalt(10 , (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                               .then(user => {
                                   req.flash('success_msg', 'Vous êtes à présent enregistrés et vous pouvez vous connecter');
                                   res.redirect('/users/login');
                               })
                               .catch(err => {
                                   console.log(err);
                                   return;
                               })
                        })
                    })
                  }
              })
        
    }
} );

// Method POST login user
router.post('/login', (req, res, next)=> {
    passport.authenticate('local', {
        successRedirect:'/ideas',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);

});
 // Method GET logout user
router.get('/logout', (req, res)=> {
    req.logout();
    req.flash('success_msg', 'Vous êtes à présent déconnecté');
    res.redirect('/users/login');
});



module.exports = router;