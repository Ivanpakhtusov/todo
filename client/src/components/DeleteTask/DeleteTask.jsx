import React, { useState } from "react";
import Modal from "react-modal";

function DeleteTask({  task, onDelete }) {
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
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false}>
        <p>Вы уверены, что хотите удалить задачу "{task.title}"?</p>
        <button onClick={handleDelete}>Да</button>
        <button onClick={closeModal}>Нет</button>
      </Modal>
    </div>
  );
}

export default DeleteTask;
