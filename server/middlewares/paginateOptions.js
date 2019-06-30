module.exports = function(req, res, next) {
  let { page = "1", limit = "3" } = req.query;
  res.locals = {
    paginateOptions: { page, limit }
  };
  next();
};
