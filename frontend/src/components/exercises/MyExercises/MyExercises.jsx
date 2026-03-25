import { Button } from '../../common/Button/Button';
import { Plus, LayersPlus } from 'lucide-react';
import styles from './MyExercises.module.css';
import { useModal } from '../../../hooks/useModal';
import { useLocalExercises } from '../../../hooks/useLocalExercises';
import { Modal } from '../../common/Modal/Modal';
import CreateExerciseModal from '../CreateExerciseModal/CreateExerciseModal';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import ExerciseDetailsModal from '../ExerciseDetailsModal/ExerciseDetailsModal';

const MyExercises = ({ onSwitchToAll }) => {
  const createModal = useModal();
  const detailsModal = useModal();
  const confirmModal = useModal();
  const { exercises, createExercise, deleteExercise } = useLocalExercises();

  function handleDeleteClick(exercise) {
    detailsModal.closeModal();
    confirmModal.openModal(exercise);
  }

  function handleConfirmDelete() {
    deleteExercise(confirmModal.modalData.id);
    confirmModal.closeModal();
  }

  return (
    <div>
      <h2>My Exercises</h2>
      <div className={styles.btnsWrapper}>
        <Button onClick={createModal.openModal}>
          <Plus size={14} /> Create new
        </Button>
        <Button onClick={onSwitchToAll}>
          <LayersPlus size={14} /> Add from Library
        </Button>
      </div>

      {exercises.length === 0 ? (
        <p>No exercises yet. Create one or add from Library.</p>
      ) : (
        <ul className={styles.exerciseList}>
          {exercises.map(ex => (
            <li key={ex.id}>
              <ExerciseCard
                exercise={{ ...ex, createdBy: 'local' }}
                onViewDetails={() => detailsModal.openModal(ex)}
                onDelete={() => handleDeleteClick(ex)}

              />
            </li>
          ))}
        </ul>
      )}

      <CreateExerciseModal isOpen={createModal.isOpen} onClose={createModal.closeModal} onSave={createExercise} />

      <ExerciseDetailsModal
        isOpen={detailsModal.isOpen}
        onClose={detailsModal.closeModal}
        exercise={detailsModal.modalData}
        onDelete={() => handleDeleteClick(detailsModal.modalData)}
      />

      <Modal isOpen={confirmModal.isOpen} onClose={confirmModal.closeModal}>
        <p className={styles.confirmText}>
          Delete <strong>{confirmModal.modalData?.name}</strong>? This cannot be undone.
        </p>
        <div className={styles.confirmActions}>
          <Button onClick={confirmModal.closeModal}>Cancel</Button>
          <Button onClick={handleConfirmDelete} className={styles.btnDanger}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
};

export default MyExercises;
