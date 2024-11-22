const cookie = require("cookie-parser");
const { validateToken } = require("../services/auth");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const cookieValue = req.cookies[cookieName];
    if (!cookieValue) {
      next();
    }
    try {
      const userPayload = validateToken(cookieValue);
      req.user = userPayload;
      return req.user;
    } catch (error) {}
    //next();
  };
}

module.exports = { checkForAuthenticationCookie };
