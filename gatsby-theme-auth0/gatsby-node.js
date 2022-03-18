const path = require("path");

const checkRequiredCreds = creds => {
  Object.entries(creds).map(([key, value]) => {
    if (!value) {
      throw new Error(`Required option "${key}" not specified`);
    }
  });
};

exports.onCreateWebpackConfig = ({ plugins, actions }, options) => {
  const {
    domain,
    clientID,
    redirectUri,
    audience,
    responseType,
    scope,
    returnTo,
  } = options;

  checkRequiredCreds({ domain, clientID, redirectUri });

  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        "process.env.AUTH0_DOMAIN": JSON.stringify(domain),
        "process.env.AUTH0_CLIENT_ID": JSON.stringify(clientID),
        "process.env.AUTH0_CALLBACK_URL": JSON.stringify(redirectUri),
        "process.env.AUTH0_AUDIENCE": JSON.stringify(audience),
        "process.env.AUTH0_RESPONSE_TYPE": JSON.stringify(responseType),
        "process.env.AUTH0_SCOPE": JSON.stringify(scope),
        "process.env.AUTH0_LOGOUT_REDIRECT": JSON.stringify(returnTo),
      }),
    ],
  });
};

exports.createPages = ({ actions }, options) => {
  const { createPage } = actions;
  const { callbackPath } = options;

  createPage({
    path: callbackPath || "/auth/callback",
    component: path.resolve(`${__dirname}/src/pages/auth/callback.tsx`),
  });
};
