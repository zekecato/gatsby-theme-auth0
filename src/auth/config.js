export const config = {
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  redirectUri: process.env.AUTH0_CALLBACK_URL,
  audience: process.env.AUTH0_AUDIENCE,
  returnTo: process.env.GATSBY_AUTH0_LOGOUT_REDIRECT,
  responseType: process.env.AUTH0_RESPONSE_TYPE || "token id_token",
  scope: process.env.AUTH0_SCOPE || "openid email profile",
};
