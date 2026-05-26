import useGlobalReducer from "../hooks/useGlobalReducer";

export const Contact = () => {
    const { store } = useGlobalReducer()
    return (
        <div className="container mt-5">
            <h1>Lista de Contactos</h1>
            {
                store.contacts?.map((contact) => (
                    <div key={contact.id} className="card p-3 mb-3">
                        <h3>{contact.name}</h3>
                        <p>{contact.phone}</p>
                        <p>{contact.email}</p>
                        <p>{contact.address}</p>
                    </div>
                ))
            }
        </div>
    )
}