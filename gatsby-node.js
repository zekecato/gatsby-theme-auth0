const checkRequiredCreds = (creds) => {
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
    callbackPath,
  } = options;

  checkRequiredCreds({ domain, clientID, redirectUri });

  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        "process.env.AUTH0_DOMAIN": JSON.stringify(domain),
        "process.env.AUTH0_CLIENT_ID": JSON.stringify(clientID),
        "process.env.AUTH0_CALLBACK_URL": JSON.stringify(redirectUri),
        "process.env.AUTH0_CALLBACK_PATH": JSON.stringify(callbackPath),
        "process.env.AUTH0_AUDIENCE": JSON.stringify(audience),
        "process.env.AUTH0_RESPONSE_TYPE": JSON.stringify(responseType),
        "process.env.AUTH0_SCOPE": JSON.stringify(scope),
        "process.env.AUTH0_LOGOUT_REDIRECT": JSON.stringify(returnTo),
      }),
    ],
  });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  const callbackPath = process.env.AUTH0_CALLBACK_PATH;
  if (callbackPath && page.path === "/auth/callback") {
    const oldPage = Object.assign({}, page);
    page.path = callbackPath;
    deletePage(oldPage);
    createPage(page);
  }
};
