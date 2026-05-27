import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

export const Contact = () => {
  const { store } = useGlobalReducer();
  console.log("STORE CONTACTS:", store.contacts); 

  return (
    <div>
      <h1>Contacts</h1>

      {store.contacts.map(contact => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};