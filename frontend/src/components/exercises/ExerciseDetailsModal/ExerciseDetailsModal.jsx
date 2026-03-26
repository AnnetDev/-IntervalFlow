import styles from './ExerciseDetailsModal.module.css';
import { Globe, User, BicepsFlexed, Timer, ChartNoAxesColumnIncreasing, ListChecks, Plus, Pencil, Trash2 } from 'lucide-react';
import { Modal } from '../../common/Modal/Modal';
import { Button } from '../../common/Button/Button';


export default function ExerciseDetailsModal({ isOpen, onClose, exercise, onAddToMine, onEdit, onDelete }) {
  if (!isOpen || !exercise) return null;
  const isGlobal = exercise.createdBy === null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.exerciseInfo}>
        {/* <div className={styles.badge}>{isGlobal ? <Globe size={16} /> : <User size={16} />}</div> */}
        <h3 className={styles.exerciseName}>{exercise.name}</h3>
        <dl className={styles.paramTable}>
          <div className={styles.paramRow}>
            <dt><ChartNoAxesColumnIncreasing />Difficulty</dt>
            <dd>{exercise.difficulty}</dd>
          </div>
          <div className={styles.paramRow}>
            <dt><BicepsFlexed />Muscle Group</dt>
            <dd>{exercise.muscleGroup}</dd>
          </div>
          <div className={styles.paramRow}>
            <dt><Timer />Duration</dt>
            <dd>{exercise.duration}s</dd>
          </div>
          <div className={styles.paramRow}>
            <dt><ListChecks />Equipment</dt>
            <dd>{exercise.equipment}</dd>
          </div>
        </dl>
        <h4 className={styles.descriptionTitle}>Description</h4>
        <p className={styles.description}>{exercise.description}</p>
      </div>

      <div className={styles.modalActions}>
        {isGlobal ? (
          <Button onClick={onAddToMine}>
            <Plus size={16} /> Add to Mine
          </Button>
        ) : (
          <>
            <Button onClick={onEdit}>
              <Pencil size={16} /> Edit
            </Button>
            <Button onClick={onDelete} variant="delete">
              <Trash2 size={16} /> Delete
            </Button>
          </>
        )}
      </div>
    </Modal>
  )
}