import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const deleteContact = async () => {

    await fetch(
      `https://playground.4geeks.com/contact/agendas/guisielo/contacts/${contact.id}`,
      {
        method: "DELETE"
      }
    );

    dispatch({
      type: "DELETE_CONTACT",
      payload: contact.id
    });
  };

  const goToEdit = () => {
    navigate(`/edit-contact/${contact.id}`);
  };

  return (
    <div className="card mb-3" >
      <div className="row g-0">
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <img
            src="https://images.pexels.com/photos/35725756/pexels-photo-35725756.jpeg"
            className="img-fluid rounded-circle"
            alt="..."
          />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">{contact.name}</h5>
            <p className="card-text"><small className="text-muted"><i class="fa-solid fa-location-dot me-2"></i>{contact.address}</small></p>
            <p className="card-text"><small className="text-muted"><i class="fa-solid fa-phone me-2"></i>{contact.phone}</small></p>
            <p className="card-text"><small className="text-muted"><i class="fa-solid fa-envelope me-2"></i>{contact.email}</small></p>
          </div>
        </div>
        <div className="col-md-2">
          <i className="fa-solid fa-pencil me-3" onClick={goToEdit}></i>
          <i className="fa-solid fa-trash" onClick={() => setShowModal(true)}></i>    
        </div>
      </div>
    </div>
  );
};