const { google } = require("googleapis");
const { Datastore } = require("@google-cloud/datastore");
const axios = require("axios").default;
const { postSingleUser, getAllUsers } = require("../models/users");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const getTokenID = async (token) => {
  // source: https://developers.google.com/identity/sign-in/web/backend-auth
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  return userid;
};

const postUserToDatabase = async (tokens, req) => {
  // get all user tokens
  const existing_users = await getAllUsers();

  // determine if token already is in the database
  const token_id = await getTokenID(tokens.id_token);

  // add token_id to session
  req.session.id_user = token_id;

  // if token already in datastore - don't add user again
  let token_already_exists = false;
  let user_id = "";
  for (const user of existing_users) {
    if (user.token_id === token_id) {
      token_already_exists = true;
      user_id = user[Datastore.KEY].id;
      break;
    }
  }

  // if token is not in the database already - post to database
  if (!token_already_exists) {
    user_id = await postSingleUser(token_id);
  }

  return user_id;
};

const oauthRedirect = async (req, res, next) => {
  //source: https://github.com/googleapis/google-api-nodejs-client
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  // if client has not been redirected to sign into google, redirect
  if (!req.query.code) {
    // generate a url that asks permissions for scopes
    const url = oauth2Client.generateAuthUrl({
      access_type: "online",
      scope: "profile",
    });
    res.redirect(url);
    return;
  }

  // client has accepted signing into Google
  // get token from JWT
  const { tokens } = await oauth2Client.getToken(req.query.code);
  oauth2Client.setCredentials(tokens);
  req.session.id_token = tokens.id_token;

  // if user is not in database already - post user to database
  const datastore_id = await postUserToDatabase(tokens, req);

  // add datastore self to session
  const self =
    req.protocol + "://" + req.get("host") + "/users/" + datastore_id;
  req.session.self = self;

  // redirect to UserInfo page with id_token in params
  const redirect_url =
    "https://robertb2-restapi.wl.r.appspot.com/authentication";
  res.redirect(redirect_url);
};

module.exports = {
  oauthRedirect,
  getTokenID,
};
