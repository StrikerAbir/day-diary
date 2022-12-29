import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import "react-photo-view/dist/react-photo-view.css";
function App() {
  return (
    <div className="App" data-theme="light">
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
