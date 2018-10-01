const express = require('express');
const router = express.Router();
const passport = require('passport');

/**
 * Social Authentication Routes.
 * Auth for:
 * * Github
 * * Facebook
 * * Twitter
 */

// GET /auth/login/github
router.get('/login/github',
  passport.authenticate('github'));

// GET /auth/github/return
router.get('/github/return',
  passport.authenticate('github', { failureRedirect: '/' }), 
  (req, res) => {
    // Success Auth, redirect profile page
    res.redirect('/profile');
});

// GET /auth/login/facebook
router.get('/login/facebook',
  passport.authenticate('facebook'));

// GET /auth/facebook/return
router.get('/facebook/return',
  passport.authenticate('facebook', { 
    failureRedirect: '/',
    scope: ['user_friends', 'manage_pages']
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/profile');
});

// GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  return res.redirect('/');
});

module.exports = router;