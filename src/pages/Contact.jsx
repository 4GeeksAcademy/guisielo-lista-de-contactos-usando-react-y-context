import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";
import { Link } from "react-router-dom";

export const Contact = () => {
  const { store, dispatch } = useGlobalReducer();

  const createAgenda = async () => {
    const resp = await fetch(
      "https://playground.4geeks.com/contact/agendas/guisielo"
    );

    if (resp.status === 404) {
      await fetch(
        "https://playground.4geeks.com/contact/agendas/guisielo",
        {
          method: "POST"
        }
      );
    }
  };
  const getContacts = async () => {
    try {
      const resp = await fetch(
        "https://playground.4geeks.com/contact/agendas/guisielo/contacts"
      );

      const data = await resp.json();

      dispatch({
        type: "GET_CONTACTS",
        payload: data.contacts
      });

    } catch (error) {
      console.log("Error loading contacts:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await createAgenda();
      await getContacts();
    };

    loadData();

  }, []);

  return (
    <div className="contacts-page">
      <div className="contacts-container">
        <div className="contacts-header">
          <Link to="/add-contact">
            <button className="btn btn-success">
              Add new contact
            </button>
          </Link>
        </div>
        {(store.contacts || []).map(contact => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
};