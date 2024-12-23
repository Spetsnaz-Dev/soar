const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user._doc.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

module.exports = authorize;