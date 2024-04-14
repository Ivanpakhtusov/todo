import React, { useState } from "react";
import Modal from "react-modal";
import "./style.css";

function DeleteTask({ task, onDelete }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDelete = () => {
    onDelete(task.id);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Удалить задачу</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="modal-content"
      >
        <p>Вы уверены, что хотите удалить задачу "{task.title}"?</p>
        <button onClick={handleDelete} className="modal-button">
          Да
        </button>
        <button
          onClick={closeModal}
          className="modal-button modal-button--cancel"
        >
          Нет
        </button>
      </Modal>
    </div>
  );
}

export default DeleteTask;
