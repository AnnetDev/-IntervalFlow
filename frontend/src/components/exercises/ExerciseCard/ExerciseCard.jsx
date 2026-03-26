import styles from './ExerciseCard.module.css';
import { Button } from '../../common/Button/Button';
import { BicepsFlexed, ListChecks, Eye, Plus, Trash2, ChartNoAxesColumnIncreasing } from 'lucide-react';

const ExerciseCard = ({ exercise, onViewDetails, onAddToMine, onDelete }) => {
  // const isUserCreated = !!exercise.createdBy;
  const isGlobal = exercise.createdBy === null;


  return (
    <div className={styles.exerciseCard}>

      <div className={styles.exerciseInfo}>
        <div className={`${styles.cardHeader} ${styles[`${exercise.difficulty}Header`]}`}>
          <h3 className={styles.exerciseName}>{exercise.name}</h3>

        </div>
        <div className={styles.exerciseParams}>
          <div className={`${styles.difficultyBadge} ${styles[exercise.difficulty]}`}><ChartNoAxesColumnIncreasing size={11} />{exercise.difficulty}</div>
          {/* <div className={styles.exerciseParam}><ChartNoAxesColumnIncreasing size={12} />{exercise.difficulty}</div> */}
          <div className={styles.exerciseParam}><BicepsFlexed size={12} />{exercise.muscleGroup}</div>
          {/* <div className={styles.exerciseParam}><ListChecks size={12} />{exercise.equipment}</div> */}
          {exercise.equipment && exercise.equipment !== 'none' && <div className={styles.exerciseParam}><ListChecks size={12} />{exercise.equipment}</div>}
        </div>
      </div>

      <div className={styles.cardBtns}>
        <Button onClick={() => onViewDetails(exercise)}>
          <Eye size={16} />Details</Button>
        {isGlobal ? <Button onClick={onAddToMine} variant="add">
          <Plus size={16} />Add
        </Button> : <Button onClick={onDelete} variant="delete">
          <Trash2 size={16} />Delete
        </Button>}

      </div>

    </div>
  );
}

export default ExerciseCard;