import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Logout(props) {
  const [logout, setLogout] = useState(false);
  useEffect(() => {
    if (logout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      props.history.push({
        pathname: "/",
      });
      window.location.reload();
    }

  }, [logout, props.history])

  const LogoutUser = () => {
    setLogout(true)
  };

  return <FontAwesomeIcon icon="sign-out-alt" size="lg" onClick={LogoutUser} />;
}
