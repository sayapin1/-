const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) throw new Error("LogIn Error");

    const isAccessTokenValidate = validateAccessToken(accessToken);
    const isRefreshTokenValidate = validateRefreshToken(refreshToken);

    if (!isRefreshTokenValidate) throw new Error("LogiN Error");

    if (!isAccessTokenValidate) {
      const newAccessToken = jwt.sign(
        {
          type: "JWT",
          loginId: refreshToken.loginId,
        },
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: "10m",
        }
      );

      res.cookie("accessToken", newAccessToken);
    }

    req.authInfo = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    next();
  } catch (error) {
    console.log(error);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(401).redirect("/");
  }

  function validateAccessToken(accessToken) {
    try {
      jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET); // JWT를 검증합니다.
      return true;
    } catch (error) {
      return false;
    }
  }

  // Refresh Token을 검증합니다.
  function validateRefreshToken(refreshToken) {
    try {
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET); // JWT를 검증합니다.
      return true;
    } catch (error) {
      return false;
    }
  }
};

module.exports = authToken;
