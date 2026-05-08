import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./components/Homepage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

import EventList from "./components/EventList";
import CreateEventPage from "./components/CreateEventPage";
import CreateRegistrationPage from "./components/CreateRegistrationPage";
import RegistrationList from "./components/RegistrationList";
import EditEventPage from "./components/EditEventPage";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {

  const location = useLocation();

  const hideHeader =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (

    <>
      {!hideHeader && <Header />}

      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* LOGIN PAGE */}
        <Route
          path="/login"
          element={<LoginForm />}
        />

        {/* REGISTER PAGE */}
        <Route
          path="/register"
          element={<RegisterForm />}
        />

        {/* EVENTS PAGE */}
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <EventList />
            </ProtectedRoute>
          }
        />

        {/* CREATE EVENT */}
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <CreateEventPage />
            </ProtectedRoute>
          }
        />

        {/* REGISTER EVENT */}
        <Route
          path="/register-event"
          element={
            <ProtectedRoute>
              <CreateRegistrationPage />
            </ProtectedRoute>
          }
        />

        {/* REGISTRATIONS */}
        <Route
          path="/registrations"
          element={
            <ProtectedRoute>
              <RegistrationList />
            </ProtectedRoute>
          }
        />

        {/* EDIT EVENT */}
        <Route
          path="/edit-event/:id"
          element={
            <ProtectedRoute>
              <EditEventPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

function App() {

  return (

    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;