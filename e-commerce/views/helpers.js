module.exports = {
  getErrMsg(errs, prop) {
    try {
      return errs.mapped()[prop].msg;
    } catch (e) {
      return "";
    }
  }
};