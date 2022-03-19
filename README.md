<div align="center">
  <h1>@zekecato/gatsby-theme-auth0 🔐</h1>
</div>

<p align="center">
  <strong>A Gatsby theme for adding Auth0 to your application.</strong>
</p>

## What's in the box?

- 💯 Easy to set up authentication.
- 🔑 SSO.
- 🔋 Batteries included: [`AuthService`] & [`useAuth`]
- 🤙 [`/auth/callback`] page automatically set up. Configurable via [`callbackPath`](#theme-options)
- 🎨 Fully customizable & extendable.

Based on https://github.com/epilande/gatsby-theme-auth0
BUT!!

- No typescript
- Updated Dependencies
- Configurable Logout Redirect Path

## Installation

```sh
$ npm install --save @zekecato/gatsby-theme-auth0
```

## Usage

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "@zekecato/gatsby-theme-auth0",
      options: {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        redirectUri: process.env.AUTH0_CALLBACK_URL,
        // audience: process.env.AUTH0_AUDIENCE, // Optional
        // responseType: process.env.AUTH0_RESPONSE_TYPE, // Optional
        // scope: process.env.AUTH0_SCOPE, // Optional
        // callbackPath: "/auth/callback", // Optional
        // returnTo: "/app", // Optional
      },
    },
  ],
};
```

Set up your login/logout buttons and you're good to go!

```jsx
import React from "react";
import { AuthService, useAuth } from "@zekecato/gatsby-theme-auth0";

export default () => {
  const { isLoggedIn, profile } = useAuth();
  return (
    <div>
      {profile && <p>Hello {profile.name}</p>}
      {isLoggedIn ? (
        <button onClick={AuthService.logout}>Logout</button>
      ) : (
        <button onClick={AuthService.login}>Login</button>
      )}
    </div>
  );
};
```

### Theme options

| Key            | Default                  | Required | Description                     |
| -------------- | ------------------------ | -------- | ------------------------------- |
| `domain`       |                          | `true`   | Configure Auth0 `Domain`        |
| `clientID`     |                          | `true`   | Configure Auth0 `Client ID`     |
| `redirectUri`  |                          | `true`   | Configure Auth0 `Callback URL`  |
| `audience`     |                          | `false`  | Configure Auth0 `Audience`      |
| `responseType` | `"token id_token"`       | `false`  | Configure Auth0 `Response Type` |
| `scope`        | `"openid email profile"` | `false`  | Configure Auth0 `Scope`         |
| `callbackPath` | `"/auth/callback"`       | `false`  | Change callback URL path        |
| `returnTo`     | `""`                     | `false`  | Change logout redirect path     |

## Shadowing

Gatsby Themes has a concept called [**Shadowing**](https://www.gatsbyjs.org/blog/2019-04-29-component-shadowing/), which allows users to override a file in a gatsby theme. This allows the theme to be fully customizable.

To start shadowing, create a folder with the theme name `gatsby-theme-auth0` in your project's `src` directory.

Now you're able to override any file in the theme. For example, if you want to override the `callback` component, create a file:

```sh
src/gatsby-theme-auth0/components/callback.js
```
