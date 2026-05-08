import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/client";

function EventList() {

  const [events, setEvents] = useState([]);
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

  useEffect(() => {
    getEvents();
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

            {/* UPDATED */}
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

              {/* UPDATED */}
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