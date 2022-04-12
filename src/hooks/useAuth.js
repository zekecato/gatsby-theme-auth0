import * as React from "react";
import auth from "../auth/service";

const useAuth = (stateCallback = (_state) => {}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(auth.isAuthenticated());
  const [profile, setProfile] = React.useState(auth.getUserProfile());
  const [token, setToken] = React.useState(auth.getAccessToken());
  const [idToken, setIdToken] = React.useState(auth.getIdToken());

  React.useEffect(() => {
    // Override `sessionStateCallback` in auth service
    auth.sessionStateCallback = (state) => {
      stateCallback(state);
      setIsLoggedIn(state.isLoggedIn);
    };

    (async () => {
      await auth.checkSession();
      try {
        const user = auth.getUserProfile();
        setProfile(user);
        const userToken = auth.getAccessToken();
        setToken(userToken);
        const userIdToken = auth.getIdToken();
        setIdToken(userIdToken);
      } catch (error) {
        console.log(`Error: ${error}`);
      }

      setIsLoading(false);
    })();

    return () => {
      // Clean up sessionStateCallback
      auth.sessionStateCallback = () => {};
    };
  }, []);

  return {
    isLoading,
    isLoggedIn,
    profile,
    token,
    idToken,
  };
};

export default useAuth;
