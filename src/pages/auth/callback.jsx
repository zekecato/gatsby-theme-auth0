import { navigate } from "gatsby";
import * as React from "react";
import AuthService from "../../auth/service";
import Callback from "../../components/callback";

const CallbackPage = (props) => {
  const { location } = props;

  React.useEffect(() => {
    if (/access_token|id_token|error/.test(location.hash)) {
      AuthService.handleAuthentication().catch((err) => {
        navigate("/auth/error", { state: { error: err.errorDescription } });
      });
    }
  }, []);

  return <Callback />;
};

export default CallbackPage;
