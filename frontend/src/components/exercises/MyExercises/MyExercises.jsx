import { useModal } from '../../../hooks/useModal';
import { useLocalExercises } from '../../../hooks/useLocalExercises';
import { useExerciseFilters } from '../../../hooks/useExerciseFilters';
import { Button } from '../../common/Button/Button';
import { Plus, LayersPlus, Trash2 } from 'lucide-react';
import { Modal } from '../../common/Modal/Modal';
import { ExerciseFilters } from '../ExerciseFilters/ExerciseFilters';
import CreateExerciseModal from '../CreateExerciseModal/CreateExerciseModal';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import ExerciseDetailsModal from '../ExerciseDetailsModal/ExerciseDetailsModal';
import styles from './MyExercises.module.css';

const MyExercises = ({ onSwitchToAll }) => {
  const { exercises, createExercise, updateExercise, deleteExercise } = useLocalExercises();
  const { filtered, selectOptions, handleClearFilters } = useExerciseFilters(exercises);

  const createModal = useModal();
  const detailsModal = useModal();
  const confirmModal = useModal();
  const editModal = useModal();

  function handleEditClick(exercise) {
    detailsModal.closeModal();
    editModal.openModal(exercise);
  }

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
      <h2 className='visuallyHidden'>My Exercises</h2>
      <ExerciseFilters
        selectOptions={selectOptions}
        onClearFilters={handleClearFilters}
        exerciseCount={exercises.length}
      />
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
          {filtered.map(ex => (
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
        onEdit={() => handleEditClick(detailsModal.modalData)}
        onDelete={() => handleDeleteClick(detailsModal.modalData)}
      />

      <CreateExerciseModal
        key={editModal.modalData?.id}
        isOpen={editModal.isOpen}
        onClose={editModal.closeModal}
        initialData={editModal.modalData}
        onSave={(data) => { updateExercise(editModal.modalData.id, data); editModal.closeModal(); }}
      />

      <Modal isOpen={confirmModal.isOpen} onClose={confirmModal.closeModal}>
        <p className={styles.confirmText}>
          Delete <strong>{confirmModal.modalData?.name}</strong>? This cannot be undone.
        </p>
        <div className={styles.confirmActions}>
          <Button onClick={confirmModal.closeModal}>Cancel</Button>
          <Button onClick={handleConfirmDelete} className={styles.btnDanger}><Trash2 size={16} />Delete</Button>
        </div>
      </Modal>
    </div>
  );
};

export default MyExercises;
