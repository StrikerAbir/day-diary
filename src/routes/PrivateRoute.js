import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";
import loading from '../assets/images/circle-loading-lines.gif'
import bg from "../assets/images/background2.jpg";
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div>
        <div className="relative">
          <div>
            <img className="h-screen w-full" src={bg} alt="" />
          </div>
          <div className="centered">
            <img src={loading} alt="" />
          </div>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;
