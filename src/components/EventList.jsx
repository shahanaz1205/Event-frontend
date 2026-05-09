import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/client";

function EventList() {

  const [events, setEvents] = useState([]);

  // NEW
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const navigate = useNavigate();

  // ADD THIS
  const user = JSON.parse(localStorage.getItem("user"));

  const getEvents = async () => {
    try {
      const response = await API.get("/events/");
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // NEW
  const getRegistrations = async () => {

    try {

      const response = await API.get("/registrations/");

      const userRegistrations = response.data.filter(
        (item) => item.user_id === user?.id
      );

      const ids = userRegistrations.map(
        (item) => item.event_id
      );

      setRegisteredEvents(ids);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    getEvents();

    if (user?.role === "user") {
      getRegistrations();
    }

  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/events/${id}`);

      alert("Event Deleted Successfully");

      getEvents();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-event/${id}`);
  };

  // NEW
  const handleRegister = async (eventId) => {

    try {

      await API.post("/registrations/", {
        event_id: eventId,
      });

      alert("Event Registered Successfully");

      getRegistrations();

    } catch (error) {

      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div className="container">
      <h1>All Events</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Max Participants</th>

            {/* USER REGISTER BUTTON */}
            {user?.role === "user" && (
              <th>Register</th>
            )}

            {/* ADMIN */}
            {user?.role === "admin" && (
              <th>Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.title}</td>
              <td>{event.description}</td>
              <td>{event.venue}</td>
              <td>{event.event_date}</td>
              <td>{event.max_participants}</td>

              {/* USER REGISTER BUTTON */}
              {user?.role === "user" && (

                <td>

                  <button
                    disabled={registeredEvents.includes(event.id)}
                    onClick={() => handleRegister(event.id)}
                    style={{
                      opacity: registeredEvents.includes(event.id)
                        ? 0.5
                        : 1,
                      cursor: registeredEvents.includes(event.id)
                        ? "not-allowed"
                        : "pointer",
                    }}
                  >

                    {registeredEvents.includes(event.id)
                      ? "Registered"
                      : "Register"}

                  </button>

                </td>
              )}

              {/* ADMIN ACTIONS */}
              {user?.role === "admin" && (
                <td>
                  <button
                    onClick={() => handleEdit(event.id)}
                  >
                    Edit
                  </button>

                  {" "}

                  <button
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </td>
              )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventList;