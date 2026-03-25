import { Modal } from '../common/Modal/Modal';

export default function CreateExerciseModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3>Create Exercise</h3>
    </Modal>
  );
}
