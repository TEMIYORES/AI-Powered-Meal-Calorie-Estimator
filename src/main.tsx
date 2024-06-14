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
import Register from "./features/auth/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import StudyPlan from "./pages/StudyPlan.tsx";
import LogSession from "./pages/LogSession.tsx";
import Settings from "./pages/Settings.tsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/*start- Public routes */}
      <Route index={true} element={<Login />} />
      <Route path={"/dashboard"} element={<Dashboard />} />
      <Route path={"/studyplan"} element={<StudyPlan />} />
      <Route path={"/settings"} element={<Settings />} />
      <Route path={"/logsession"} element={<LogSession />} />
      <Route path="register" element={<Register />} />
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
