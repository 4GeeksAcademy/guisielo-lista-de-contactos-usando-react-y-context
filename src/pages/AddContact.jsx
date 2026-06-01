import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";


export const AddContact = () => {

  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    agenda_slug: "guisielo"
  });

  useEffect(() => {
    if (id) {
      const contactToEdit = store.contacts.find(
        contact => contact.id === parseInt(id)
      );

      if (contactToEdit) {
        setContact(contactToEdit);
      }
    }
  }, [id, store.contacts]);

  const handleChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !contact.name ||
      !contact.phone ||
      !contact.email ||
      !contact.address
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    const url = id
      ? `https://playground.4geeks.com/contact/agendas/guisielo/contacts/${id}`
      : "https://playground.4geeks.com/contact/agendas/guisielo/contacts";

    const method = id ? "PUT" : "POST";

    const resp = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      }
    );
    
    const data = await resp.json();

    alert(id ? "Contacto actualizado correctamente" : "Contacto creado correctamente");

    dispatch({
      type: id ? "UPDATE_CONTACT" : "ADD_CONTACT",
      payload: data
    });

    setContact({
        name: "",
        phone: "",
        email: "",
        address: "",
        agenda_slug: "guisielo"
    });
      
    navigate("/contacts");

  };

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h1>Add a new contact</h1>

      <div style={{ width: "60%" }}>
        <h6>Full Name</h6>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            className="form-control mb-3"
            value={contact.name}
            onChange={handleChange}
          />
          <h6>Email</h6>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            value={contact.email}
            onChange={handleChange}
          />
          <h6>Phone</h6>
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone"
            className="form-control mb-3"
            value={contact.phone}
            onChange={handleChange}
          />
          <h6>Address</h6>
          <input
            type="text"
            name="address"
            placeholder="Enter Address"
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