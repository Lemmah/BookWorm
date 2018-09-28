const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /
router.get('/', (req, res, next) => {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', (req, res, next) => {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', (req, res, next) => {
  return res.render('contact', { title: 'Contact' });
});

// GET /register
router.get('/register', (req, res, next) => {
  return res.render('register', {title: 'Sign Up'});
});

// POST /register
router.post('/register', (req, res, next) => {
  if (
    req.body.email &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword
  ) {
    // Confirm user typed same password twice
    if (req.body.password !== req.body.confirmPassword) {
      const err = new Error('Passwords do not match!');
      err.status = 400;
      return next(err);
    }

    // craete object with form data
    const userData = {
      email: req.body.email,
      name: req.body.name,
      favoriteBook: req.body.favoriteBook,
      password: req.body.password
    };

    // use schema's create method to insert document into Mongo
    User.create(userData, (error, user) => {
      if (error) {
        return next(error);
      } else {
        return res.redirect('/profile');
      }
    });

  } else {
    const err = new Error('All fields are required.');
    err.status = 400;
    return next(err);
  }
});

module.exports = router;