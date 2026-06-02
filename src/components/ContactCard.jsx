import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const deleteContact = async () => {

    try {
      const resp = await fetch(
        `https://playground.4geeks.com/contact/agendas/guisielo/contacts/${contact.id}`,
        {
          method: "DELETE"
        }      
      );

      if (!resp.ok) {
        throw new Error(`Error HTTP: ${resp.status}`);
      }

      dispatch({
        type: "DELETE_CONTACT",
        payload: contact.id
      });
  
    } catch (error) {
        console.error(error);
        alert("No se pudo eliminar el contacto");
    }
  };

  return (
    <>
    <div className="card mb-3" >
      <div className="row g-0">
        <div className="col-md-3 contact-image-container">
          <img
            src="https://images.pexels.com/photos/35725756/pexels-photo-35725756.jpeg"
            className="img-fluid rounded-circle"
            alt={contact.name}
          />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">{contact.name}</h5>
            <p className="card-text"><small className="text-muted"><i className="fa-solid fa-location-dot me-2"></i>{contact.address}</small></p>
            <p className="card-text"><small className="text-muted"><i className="fa-solid fa-phone me-2"></i>{contact.phone}</small></p>
            <p className="card-text"><small className="text-muted"><i className="fa-solid fa-envelope me-2"></i>{contact.email}</small></p>
          </div>
        </div> 
        <div className="col-md-2">
          <i className="fa-solid fa-pencil me-3" onClick={() => navigate(`/edit-contact/${contact.id}`)}></i>
          <i className="fa-solid fa-trash" onClick={() => setShowModal(true)}></i>    
        </div>
      </div>
    </div>
    {showModal && (
      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Are you sure?</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>Si tu eliminas este contacto, ya no podrás recuperarlo. ¡Piénsalo bien!</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Oh no!</button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={async () => {
                  await deleteContact();
                  setShowModal(false);
                }}>
                Yes baby!
              </button>
            </div>
          </div>
        </div>
      </div> )}
    </>
  );
};