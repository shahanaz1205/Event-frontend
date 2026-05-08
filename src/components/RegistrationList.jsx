import { useEffect, useState } from "react";
import API from "../api/client";

function RegistrationList() {

  const [registrations, setRegistrations] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const getRegistrations = async () => {

    try {

      const response = await API.get("/registrations/");

      setRegistrations(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    getRegistrations();

  }, []);

  const handleCancel = async (id) => {

    try {

      await API.delete(`/registrations/${id}`);

      alert("Registration Cancelled");

      getRegistrations();

    } catch (error) {

      console.log(error);

      alert("Cancel Failed");
    }
  };

  return (

    <div className="container">

      <h1>All Registrations</h1>

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
            <th>User ID</th>
            <th>Username</th>
            <th>Event ID</th>

            {/* ADMIN ki matrame Action */}
            {user.role === "admin" && (
              <th>Action</th>
            )}

          </tr>

        </thead>

        <tbody>

          {registrations.map((registration) => (

            <tr key={registration.id}>

              <td>{registration.id}</td>

              <td>{registration.user_id}</td>

              <td>{registration.username}</td>

              <td>{registration.event_id}</td>

              {/* ADMIN ki matrame Cancel */}
              {user.role === "admin" && (
                <td>

                  <button
                    onClick={() =>
                      handleCancel(registration.id)
                    }
                  >
                    Cancel
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

export default RegistrationList;