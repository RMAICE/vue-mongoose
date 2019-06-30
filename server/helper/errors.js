module.exports = function(req, res, next) {
  res.err = function(message) {
    res.send({ error: message });
  };
  next();
};
