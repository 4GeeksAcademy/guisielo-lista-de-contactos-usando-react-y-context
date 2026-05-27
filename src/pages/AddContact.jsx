import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {

    const { store, dispatch } = useGlobalReducer()

    const [contact, setContact] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        agenda_slug: "guisielo"
    })

    const handleChange = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="container mt-5">
            <h1>Add Contact</h1>
            <form>
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

                <button
                    className="btn btn-primary"
                    onClick={() =>{
                        console.log("CONTACTO ENVIADO:", contact);
                        dispatch({
                        type: "ADD_CONTACT",
                        payload: {
                            ...contact,
                            id: Date.now()
                        }
                        })
                    }}
                >
                        Save Contact
                </button>

            </form>
        </div>
    )
};