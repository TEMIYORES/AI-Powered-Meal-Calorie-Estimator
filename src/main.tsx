import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./features/auth/Login.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.tsx";
import { Toaster } from "sonner";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/*start- Public routes */}
      <Route index={true} element={<Login />} />
      <Route path={"*"} element={<Login />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Toaster />
    <RouterProvider router={router} />
  </Provider>
);
