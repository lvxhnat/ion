import * as React from "react";
import request from "services";

import { getAuth } from "firebase/auth";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { ENDPOINTS } from "endpoints/endpoints";
import { ROUTES } from "common/constant";
import { useFirebaseUserStore } from "store/user/user";

export default function Private({ FC }: any) {
  const [cookies, , removeCookies] = useCookies(["access_token","refresh_token"]);
  const setUser = useFirebaseUserStore(state => state.setUser)

  const [isValid, setIsValid] = React.useState<boolean>(!!cookies.access_token);
  React.useEffect(() => {
    const access_token = cookies.access_token;
    const auth = getAuth();
    if (!access_token) {
      localStorage.removeItem("user");
      removeCookies("access_token");
      removeCookies("refresh_token");
      return;
    } else {
      request("ion-backend")
        .post(
          ENDPOINTS.AUTH.TOKEN_CHECKER,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((res) => {
          setUser(res.data)
          setIsValid(true);
        })
        .catch((err) => {
          setIsValid(false);
        });
    }
  });

  if (isValid) {
    return <FC />;
  } else {
    return <Navigate to={ROUTES.SIGNIN} />;
  }
}
