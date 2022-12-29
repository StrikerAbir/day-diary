import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";
import useToken from "../hooks/useToken";
import { setUserEmail } from "../Redux/features/userSlice";

const GoogleLogin = () => {
  const { googleProviderLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  // const [loginUserEmail, setLoginUserEmail] = useState("");
  const { userEmail } = useSelector((state) => state.userR);
  const dispatch = useDispatch();
  const [token] = useToken(userEmail);

  if (token) {
    navigate(from, { replace: true });
  }

  const handleGoogleLogin = () => {
    googleProviderLogin()
      .then((result) => {
        const user = result.user;
        console.log(user);
        saveUser(user.displayName, user.email);
        toast.success("Successfully login..");
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };
  const saveUser = (name, email) => {
    const user = { name, email };
    fetch(" http://localhost:1000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setUserEmail(email));
      });
  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="btn btn-accent btn-outline w-full"
    >
      CONTINUE WITH GOOGLE
    </button>
  );
};

export default GoogleLogin;
