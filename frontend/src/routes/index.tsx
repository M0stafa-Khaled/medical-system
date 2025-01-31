import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import NotFound from "../pages/NotFound";
import UnAuthorized from "../pages/UnAuthorized";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const routes = createRoutesFromElements(
  <>
    {/* Public */}
    <Route path="/" element={<>الصفحة الرئيسية</>} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Errors */}
    <Route path="*" element={<NotFound />} />
    <Route path="/unauthorized" element={<UnAuthorized />} />
  </>
);

const router = createBrowserRouter(routes, {
  basename: "/",
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export default router;
