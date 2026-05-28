import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const AddContact = () => {

  const { dispatch } = useGlobalReducer();
  const { id } = useParams();

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    agenda_slug: "guisielo"
  });

  const handleChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resp = await fetch(
      "https://playground.4geeks.com/contact/agendas/guisielo/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      }
    );

    const data = await resp.json();

     dispatch({
      type: "ADD_CONTACT",
      payload: data
    });
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h1>Add a new contact</h1>

      <div style={{ width: "60%" }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-3"
            value={contact.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="form-control mb-3"
            value={contact.phone}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={contact.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            className="form-control mb-3"
            value={contact.address}
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100" type="submit">
            Save Contact
          </button>

          <Link to="/contacts" className="btn btn-link">
          or get back to contacts
          </Link>

        </form>
      </div>
    </div>
  );
};