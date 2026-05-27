import { useState } from "react";

export const AddContact = () => {

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

    await fetch(
      "https://playground.4geeks.com/contact/agendas/guisielo/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      }
    );

    // opcional: limpiar formulario
    setContact({
      name: "",
      phone: "",
      email: "",
      address: "",
      agenda_slug: "guisielo"
    });
  };

  return (
    <div className="container mt-5">
      <h1>Add Contact</h1>

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

        <button className="btn btn-primary" type="submit">
          Save Contact
        </button>
      </form>
    </div>
  );
};