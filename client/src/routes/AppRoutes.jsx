import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { ROUTES } from "../constants/routes";

import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";
import Library from "../pages/Library";
import SkillHub from "../pages/SkillHub";
import TeamFinder from "../pages/TeamFinder";
import Notification from "../pages/Notification";
import Settings from "../pages/Settings";
import Chat from "../pages/Chat";

import ProtectedRoute from "../components/auth/ProtectedRoute";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFB] px-6">
      <h1 className="text-8xl font-bold text-[#16332D]">
        404
      </h1>

      <p className="mt-5 text-lg text-gray-600">
        The page you are looking for does not exist.
      </p>

      <button
        onClick={() => {
          window.location.href = ROUTES.LANDING;
        }}
        className="mt-8 rounded-xl bg-[#16332D] px-8 py-3 font-semibold text-white transition hover:bg-[#214740]"
      >
        Go Home
      </button>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* ---------- Public Routes ---------- */}

        <Route
          path={ROUTES.LANDING}
          element={<Landing />}
        />

        <Route
          path={ROUTES.LOGIN}
          element={<Login />}
        />

        <Route
          path={ROUTES.REGISTER}
          element={<Register />}
        />

        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={<ForgotPassword />}
        />

        {/* ---------- Protected Routes ---------- */}

        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.LIBRARY}
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.SKILL_HUB}
          element={
            <ProtectedRoute>
              <SkillHub />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.TEAM_FINDER}
          element={
            <ProtectedRoute>
              <TeamFinder />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.NOTIFICATIONS}
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.SETTINGS}
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.CHAT}
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        {/* Old Home URL Redirect */}

        <Route
          path="/home"
          element={
            <Navigate
              replace
              to={ROUTES.DASHBOARD}
            />
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
}