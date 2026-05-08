import { useState } from "react";
import API from "../api/client";

function CreateEventPage() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [maxParticipants, setMaxParticipants] =
    useState("");

  const handleCreateEvent = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/events/",
        {
          title: title,
          description: description,
          venue: venue,
          event_date: eventDate,
          max_participants:
            parseInt(maxParticipants),
        }
      );

      alert("Event Created");

      console.log(response.data);

    } catch (error) {

      console.log(error.response?.data);

      alert("Event Creation Failed");
    }
  };

  return (
    <div className="form-card">

      <h1>Create Event</h1>

      <form onSubmit={handleCreateEvent}>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) =>
            setVenue(e.target.value)
          }
        />

        <br /><br />

        <input
          type="date"
          value={eventDate}
          onChange={(e) =>
            setEventDate(e.target.value)
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Max Participants"
          value={maxParticipants}
          onChange={(e) =>
            setMaxParticipants(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Create Event
        </button>

      </form>

    </div>
  );
}

export default CreateEventPage;