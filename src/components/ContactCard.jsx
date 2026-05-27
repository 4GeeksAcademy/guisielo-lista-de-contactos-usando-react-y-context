import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer();

  return (
    <div className="card">
      <h3>{contact.name}</h3>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>

      <button
        onClick={() =>
          dispatch({
            type: "DELETE_CONTACT",
            payload: contact.id
          })
        }
      >
        Delete
      </button>

      <button
        onClick={() =>
          dispatch({
            type: "UPDATE_CONTACT",
            payload: {
              ...contact,
              name: prompt("Nuevo nombre", contact.name),
              email: prompt("Nuevo email", contact.email),
              phone: prompt("Nuevo teléfono", contact.phone)
            }
          })
        }
      >
        Edit
      </button>
    </div>
  );
};