import * as React from "react";
import AuthService from "../../auth/service";

const CallbackPage = (props) => {
  const { location } = props;

  React.useEffect(() => {
    AuthService.logout();
  }, []);

  return <p>Login Error: {JSON.stringify(location.state.error)}</p>;
};

export default CallbackPage;
