import { useState } from 'react';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  function openModal(data = null) {
    setModalData(data);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setModalData(null);
  }

  return { isOpen, modalData, openModal, closeModal };
}