import { useNavigate } from "react-router-dom";

function HomePage() {

  const navigate = useNavigate();

  return (

    <div className="home">

      <h1>
        Event Management System
      </h1>

      <p>
        Manage events, registrations and users easily.
      </p>

      <div style={{
        display: "flex",
        gap: "15px"
      }}>

        <button
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>

        <button
          onClick={() => navigate("/register")}
          style={{
            background: "white",
            color: "#2563eb",
            border: "2px solid #2563eb"
          }}
        >
          Create Account
        </button>

      </div>

    </div>
  );
}

export default HomePage;