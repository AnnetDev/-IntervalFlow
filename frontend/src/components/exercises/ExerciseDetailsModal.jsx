import styles from './ExerciseDetailsModal.module.css';
import { Globe, User, BicepsFlexed, Timer, ChartNoAxesColumnIncreasing, ListChecks } from 'lucide-react';
import { Modal } from '../common/Modal/Modal';


export default function ExerciseDetailsModal({ isOpen, onClose, exercise }) {
  if (!isOpen || !exercise) return null;
  const isGlobal = exercise.createdBy === null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.exerciseInfo}>
        <div className={styles.badge}>{isGlobal ? <Globe size={16} /> : <User />}</div>
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
        <h4>Description</h4>
        <p>{exercise.description}</p>
      </div>
    </Modal>
  )
}