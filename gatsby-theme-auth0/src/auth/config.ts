export const config = {
  domain: process.env.AUTH0_DOMAIN!,
  clientID: process.env.AUTH0_CLIENT_ID!,
  redirectUri: process.env.AUTH0_CALLBACK_URL!,
  audience: process.env.AUTH0_AUDIENCE!,
  responseType: process.env.AUTH0_RESPONSE_TYPE! || "token id_token",
  scope: process.env.AUTH0_SCOPE! || "openid email profile",
  returnTo: process.env.AUTH0_LOGOUT_REDIRECT! || "",
};
