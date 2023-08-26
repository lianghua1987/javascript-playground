const {validationResult} = require('express-validator');

module.exports = {
  handleErrors(templateCallback, dataCallback) {
    return async (req, res, next) => {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        let data = {};
        if (dataCallback) {
          data = await dataCallback(req);
        }
        return res.send(templateCallback({errs, ...data}));
      }
      next();
    };
  },
  requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.redirect('/signin');
    }
    next();
  }
};