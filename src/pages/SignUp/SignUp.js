import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authProvider/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import GoogleLogin from "../../shared/GoogleLogin";
import bg from '../../assets/images/background1.jpg'
import useToken from "../../hooks/useToken";


const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState(null);

  const [createdUserEmail, setCreatedUserEmail] = useState(null);
  // custom hook
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();

  if (token) {
    navigate("/");
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSignUp = (data) => {
    setSignUpError(null);
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        const userInfo = {
          displayName: data.name,
        };
        // console.log(userInfo);
        updateUserProfile(userInfo)
          .then(() => {
            saveUser(data.name, data.email);
          })
          .catch((err) => console.error(err));
        toast.success("User created successfully..");
      })
      .catch((err) => {
        console.error(err);
        setSignUpError(err.message);
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
        setCreatedUserEmail(email);
      });
  };

  return (
    <div className="relative">
      <div>
        <img className="h-screen w-full" src={bg} alt="" />
      </div>
      <div className="absolute top-0 w-full">
        <div className="h-screen flex justify-center items-center">
          <div className="lg:w-1/3 md:w-1/2  shadow-xl rounded-xl p-7 bg-base-100 bg-opacity-10">
            <h2 className="text-4xl text-white fontPoppins text-center mb-1 font-semibold">
              SignUp
            </h2>
            <form onSubmit={handleSubmit(handleSignUp)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-white">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  {...register("name", { required: "Name is required." })}
                />
                {errors.name && (
                  <p className="text-warning text-sm">
                    <small>{errors.name?.message}</small>
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-white">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  {...register("email", { required: "Email is required." })}
                />
                {errors.email && (
                  <p className="text-warning text-sm">
                    <small>{errors.email?.message}</small>
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-white">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  className="input input-bordered"
                  {...register("password", {
                    required: "Password is required.",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 character long.",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                      message:
                        "Password must have one (capital letter , special characters and number.",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-warning text-sm">
                    <small>{errors.password?.message}</small>
                  </p>
                )}
              </div>

              <div>
                {signUpError && (
                  <p className="text-warning text-sm">
                    <small>{signUpError}</small>
                  </p>
                )}
              </div>
              <div className="form-control mt-4">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="SignUp"
                />
              </div>
            </form>
            <p className="text-center py-3 text-sm text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </p>
            <div className="divider text-white m-0 mb-2">OR</div>
            <div>
              <GoogleLogin></GoogleLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
