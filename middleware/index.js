const loggedOut = (req, res, next) => {
  if (req.session && req.session.userId) {
    return res.redirect('/profile');
  }
  return next();
};

const requiresLogin = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  const error = new Error('You should log in to view this page.');
  error.status = 401;
  return next(error);
}

module.exports = { loggedOut, requiresLogin };