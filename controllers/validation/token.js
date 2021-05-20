const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const ApiError = require("../../error/error");

const authorizationExists = (req, next) => {
  if (req.headers.authorization === undefined) {
    next(
      ApiError.unauthorized(
        "The request is either missing or has invalid JWT bearer token"
      )
    );
    return false;
  }

  return true;
};

const verifyToken = async (req, next) => {
  // source: https://developers.google.com/identity/sign-in/web/backend-auth
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.headers.authorization.split(" ")[1],
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userid = payload["sub"];
    return userid;
  } catch {
    next(
      ApiError.unauthorized(
        "The request is either missing or has invalid JWT bearer token"
      )
    );
    return false;
  }
};

module.exports = { authorizationExists, verifyToken };
