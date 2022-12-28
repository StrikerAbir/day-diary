import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";
// import useToken from "../hooks/useToken";

const GoogleLogin = () => {
  const { googleProviderLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  // const [loginUserEmail, setLoginUserEmail] = useState("");
  // const [token] = useToken(loginUserEmail);

  // if (token) {
  //   navigate(from, { replace: true });
  // }

  const handleGoogleLogin = () => {
    googleProviderLogin()
      .then((result) => {
        const user = result.user;
        console.log(user);
        // saveUser(user.displayName, user.email);
        toast.success("Successfully login..");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };
  // const saveUser = (name, email) => {
  //   const user = { name, email, user_type: "Buyer" };
  //   fetch(" https://sb-furniture-server-side.vercel.app/users", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // setLoginUserEmail(email);
  //     });
  // };
  return (
    <button onClick={handleGoogleLogin} className="btn btn-accent btn-outline w-full">
      CONTINUE WITH GOOGLE
    </button>
  );
};

export default GoogleLogin;
