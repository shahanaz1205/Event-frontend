import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/client";

function RegisterForm() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/register",
        {
          username: username,
          password: password,
        }
      );

      console.log(response.data);

      alert("Register Success");

      // ✅ LOGIN PAGE KI VELTADI
      navigate("/login");

    } catch (error) {

      console.log(error.response);

      alert(error.response.data.detail);
    }
  };

  return (

    <div className="auth-box">

      <h1>Create Account</h1>

      <form onSubmit={handleRegister}>

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
          Create Account
        </button>

      </form>

    </div>
  );
}

export default RegisterForm;