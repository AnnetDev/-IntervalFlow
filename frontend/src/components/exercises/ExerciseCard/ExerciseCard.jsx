import styles from './ExerciseCard.module.css';
import { Button } from '../../common/Button/Button';
import { BicepsFlexed, ListChecks, Eye, Plus, Trash2, ChartNoAxesColumnIncreasing } from 'lucide-react';

const ExerciseCard = ({ exercise, onViewDetails, onAddToMine, onDelete }) => {
  const isGlobal = exercise.createdBy === null;

  return (
    <div className={styles.exerciseCard}>
      <span className={`${styles.rail} ${styles[`${exercise.difficulty}Rail`]}`}></span>

      <h3 className={styles.exerciseName}>{exercise.name}</h3>

      <div className={styles.metaRow}>
        <span className={`${styles.chip} ${styles.difficultyBadge} ${styles[exercise.difficulty]}`}>
          <ChartNoAxesColumnIncreasing size={13} />{exercise.difficulty}
        </span>
        <span className={`${styles.chip} ${styles.meta}`}>
          <BicepsFlexed size={13} />{exercise.muscleGroup}
        </span>
        {exercise.equipment && exercise.equipment !== 'none' && (
          <span className={`${styles.chip} ${styles.meta}`}>
            <ListChecks size={13} />{exercise.equipment}
          </span>
        )}
      </div>

      <div className={styles.cardBtns}>
        <Button onClick={() => onViewDetails(exercise)}>
          <Eye size={16} />Details
        </Button>
        {isGlobal ? (
          <Button onClick={onAddToMine} variant="add">
            <Plus size={16} />Add
          </Button>
        ) : (
          <Button onClick={onDelete} variant="delete">
            <Trash2 size={16} />Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExerciseCard;
