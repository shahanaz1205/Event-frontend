import { useState } from "react";
import API from "../api/client";

function CreateRegistrationPage() {

  const [eventId, setEventId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const role = localStorage.getItem("role");

    // Admin block
    if (role === "admin") {
      alert("Only users can register for events");
      return;
    }

    try {

      await API.post("/registrations/", {
        event_id: Number(eventId),
      });

      alert("Registration Successful");

      setEventId("");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div>
      <h1>Register Event</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          placeholder="Enter Event ID"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Register
        </button>

      </form>
    </div>
  );
}

export default CreateRegistrationPage;