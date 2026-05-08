import { useState } from "react";
import API from "../api/client";

function EditEventPage() {
  const [eventId, setEventId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/events/${eventId}`, {
        title,
        description,
        venue: location,
        event_date: date,
        max_participants: Number(maxParticipants),
      });

      alert("Event Updated Successfully");
    } catch (error) {
      console.log(error.response?.data);
      alert(JSON.stringify(error.response?.data));
    }
  };

  return (
    <div className="form-card">
      <h1>Edit Event</h1>

      <form onSubmit={handleUpdate}>
        <input
          type="number"
          placeholder="Event ID"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <br />
        <br />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Max Participants"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Update Event
        </button>
      </form>
    </div>
  );
}

export default EditEventPage;