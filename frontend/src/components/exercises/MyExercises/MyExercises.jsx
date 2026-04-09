import { useModal } from '../../../hooks/useModal';
import { useLocalExercises } from '../../../hooks/useLocalExercises';
import { useExerciseFilters } from '../../../hooks/useExerciseFilters';
import { useToast } from '../../../hooks/useToast';
import { Toast } from '../../common/Toast/Toast';
import { Button } from '../../common/Button/Button';
import { Plus, LayersPlus, Trash2 } from 'lucide-react';
import { Modal } from '../../common/Modal/Modal';
import { ExerciseFilters } from '../ExerciseFilters/ExerciseFilters';
import CreateExerciseModal from '../CreateExerciseModal/CreateExerciseModal';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import ExerciseDetailsModal from '../ExerciseDetailsModal/ExerciseDetailsModal';
import styles from './MyExercises.module.css';

const MyExercises = ({ onSwitchToAll }) => {
    const { exercises, createExercise, updateExercise, deleteExercise } =
        useLocalExercises();
    const { filtered, selectOptions, handleClearFilters } =
        useExerciseFilters(exercises);

    const createModal = useModal();
    const detailsModal = useModal();
    const confirmModal = useModal();
    const editModal = useModal();
    const { message, showToast } = useToast();

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
        showToast('Exercise deleted');
    }

    return (
        <div>
            <h2 className="visuallyHidden">My Exercises</h2>
            <ExerciseFilters
                selectOptions={selectOptions}
                onClearFilters={handleClearFilters}
                exerciseCount={exercises.length} // Bug: shows total count, not filtered count — should be filtered.length
            />
            <div className={styles.btnsWrapper}>
                <Button onClick={createModal.openModal}>
                    <Plus size={14} /> Create new
                </Button>
                <Button onClick={onSwitchToAll}>
                    <LayersPlus size={14} /> Add from Library
                </Button>
            </div>

            {/* Empty state checks exercises.length but renders filtered — if filters hide everything,
         user sees an empty list with no explanation. Check filtered.length or show a "no matches" message. */}
            {exercises.length === 0 ? (
                <p>No exercises yet. Create one or add from Library.</p>
            ) : (
                <ul className={styles.exerciseList}>
                    {filtered.map((ex) => (
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

            <CreateExerciseModal
                isOpen={createModal.isOpen}
                onClose={createModal.closeModal}
                onSave={(data) => {
                    createExercise(data);
                    showToast('Exercise created');
                }}
            />

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
                onSave={(data) => {
                    updateExercise(editModal.modalData.id, data);
                    editModal.closeModal();
                    showToast('Exercise updated');
                }}
            />

            <Modal
                isOpen={confirmModal.isOpen}
                onClose={confirmModal.closeModal}
            >
                <p className={styles.confirmText}>
                    Delete <strong>{confirmModal.modalData?.name}</strong>? This
                    cannot be undone.
                </p>
                <div className={styles.confirmActions}>
                    <Button onClick={confirmModal.closeModal}>Cancel</Button>
                    <Button
                        onClick={handleConfirmDelete}
                        className={styles.btnDanger}
                    >
                        <Trash2 size={16} />
                        Delete
                    </Button>
                </div>
            </Modal>

            <Toast message={message} />
        </div>
    );
};

export default MyExercises;
