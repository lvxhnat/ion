import * as React from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "common/constant";
import { AuthContext } from "providers/AuthProvider/AuthProvider";

export default function Private({ FC }: any) {

  const { user } = React.useContext(AuthContext)!
  if (user) {
    return <FC />;
  } else {
    return <Navigate to={ROUTES.SIGNIN} />;
  }
}
