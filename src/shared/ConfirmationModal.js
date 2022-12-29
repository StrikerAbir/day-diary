import React from "react";

const ConfirmationModal = ({
  title,
  message,
  closeModal,
  modalData,
  successAction,
  successButton,
}) => {
  console.log(modalData);
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="ConfirmationModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <button onClick={closeModal} className="btn btn-warning">
              Cancel
            </button>
            <label
              onClick={() => successAction(modalData)}
              htmlFor="ConfirmationModal"
              className="btn btn-outline btn-error"
            >
              {successButton}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
