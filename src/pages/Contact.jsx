import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

export const Contact = () => {
  const { store, dispatch } = useGlobalReducer();

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
    getContacts();
  }, []);

  return (
    <div>
      <h1>Contacts</h1>
      {(store.contacts || []).map(contact => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
      
    </div>
  );
};