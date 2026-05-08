import { Link, useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  // USER DATA
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = user?.role;

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <nav className="navbar">

      {/* LEFT SIDE LINKS */}
      <div
        className="nav-links"
        style={{
          display: "flex",
          gap: "20px", // ADD THIS
          alignItems: "center"
        }}
      >

        {/* EVENTS */}
        <Link to="/events">
          Events
        </Link>

        {/* ADMIN ONLY */}
        {role === "admin" && (
          <Link to="/create-event">
            Create Event
          </Link>
        )}

        {/* USER ONLY */}
        {role === "user" && (
          <Link to="/register-event">
            Register Event
          </Link>
        )}

        {/* BOTH */}
        <Link to="/registrations">
          Registrations
        </Link>

      </div>

      {/* RIGHT SIDE BUTTON */}
      <button onClick={handleLogout}>
        Logout
      </button>

    </nav>
  );
}

export default Header;