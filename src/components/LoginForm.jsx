import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/client";

function LoginForm() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.access_token
      );

      // SAVE USER DATA
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Success");

      // ROLE BASED NAVIGATION
      const role = response.data.user.role;

      if (role === "admin") {

        navigate("/events");

      } else {

        navigate("/registrations");
      }

    } catch (error) {

      console.log(error.response?.data);

      alert("Login Failed");
    }
  };

  return (

    <div className="home">

      <h1>Event Management System</h1>

      <p>
        Manage events, registrations and users easily.
      </p>

      <div className="form-card">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Sign In
          </button>

        </form>

      </div>

    </div>
  );
}

export default LoginForm;