import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";

function App() {
  return (
    <div className="App" data-theme="light">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
