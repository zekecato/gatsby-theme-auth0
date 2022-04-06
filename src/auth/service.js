import * as auth0 from "auth0-js";
import { navigate } from "gatsby";
import { config } from "./config";

const isBrowser = typeof window !== "undefined";

class Auth {
  constructor() {
    this.sessionStateCallback = (_state) => {};
    this.auth0 = process.env.AUTH0_DOMAIN
      ? new auth0.WebAuth(config)
      : undefined;
    this.login = () => {
      if (!isBrowser) return;
      // Save postLoginUrl so we can redirect user back to where they left off after login screen
      localStorage.setItem("postLoginUrl", window.location.pathname);
      this.auth0 && this.auth0.authorize();
    };
    this.handleAuthentication = () =>
      new Promise((resolve, reject) => {
        this.auth0 &&
          this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
              this.setSession(authResult);
              const postLoginUrl = localStorage.getItem("postLoginUrl");
              localStorage.removeItem("postLoginUrl");
              if (postLoginUrl) {
                navigate(postLoginUrl);
              }
              return resolve(authResult);
            } else if (err) {
              return reject(err);
            }
            return resolve();
          });
      });
    this.getAccessToken = () => this.accessToken;
    this.getIdToken = () => this.idToken;
    this.getUserProfile = () => this.userProfile;
    this.checkSession = () =>
      new Promise((resolve) => {
        this.auth0 &&
          this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
              this.setSession(authResult);
              return resolve(authResult);
            }
            if (err && err.error === "login_required") {
              // User has been logged out from Auth0 server.
              // Remove local session.
              this.localLogout();
            }
            return resolve();
          });
      });
    this.localLogout = () => {
      if (!isBrowser) return;
      // Remove tokens and user profile
      this.accessToken = undefined;
      this.idToken = undefined;
      this.userProfile = undefined;
      localStorage.removeItem("isLoggedIn");
      this.sessionStateCallback({
        isLoggedIn: false,
        userProfile: undefined,
        accessToken: undefined,
        idToken: undefined,
      });
    };
    this.logout = () => {
      if (!isBrowser) return;
      this.localLogout();
      this.auth0 &&
        this.auth0.logout({
          returnTo: `${window.location.origin}${
            process.env.AUTH0_LOGOUT_REDIRECT || ""
          }`,
          clientID: process.env.AUTH0_CLIENT_ID,
        });
    };
    this.isAuthenticated = () => {
      if (!isBrowser) return false;
      return localStorage.getItem("isLoggedIn") === "true";
    };
  }
  setSession(authResult) {
    if (!isBrowser) return;
    localStorage.setItem("isLoggedIn", "true");
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.userProfile = authResult.idTokenPayload;
    this.sessionStateCallback({
      isLoggedIn: true,
      userProfile: this.userProfile,
      accessToken: this.accessToken,
      idToken: this.idToken,
    });
  }
}
const auth = new Auth();
export default auth;
