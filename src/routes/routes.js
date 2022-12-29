import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MyDiary from "../pages/MyDiary/MyDiary";
import SignUp from "../pages/SignUp/SignUp";
import WriteDiary from "../pages/WriteDiary/WriteDiary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/writeDiary",
        element: <WriteDiary></WriteDiary>,
      },
      {
        path: "/myDiary",
        element: <MyDiary></MyDiary>,
      },
    ],
  },
]);
