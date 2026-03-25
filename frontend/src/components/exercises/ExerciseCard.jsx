import styles from './ExerciseCard.module.css';
import { Globe, User } from 'lucide-react';
import { Button } from '../common/Button/Button';
import { BicepsFlexed, Timer, ChartNoAxesColumnIncreasing, ListChecks, Eye, Plus } from 'lucide-react';

const ExerciseCard = ({ exercise, onViewDetails, onAddToMine }) => {
  // const isUserCreated = !!exercise.createdBy;
  const isGlobal = exercise.createdBy === null;


  return (
    <div className={styles.exerciseCard}>

      <div className={styles.exerciseInfo}>
        <div className={styles.badge}>{isGlobal ? <Globe size={16} /> : <User />}</div>
        <h3 className={styles.exerciseName}>{exercise.name}</h3>
        <div className={styles.exerciseParams}>
          <div className={styles.exerciseParam}><ChartNoAxesColumnIncreasing size={12} />{exercise.difficulty}</div>
          <div className={styles.exerciseParam}><BicepsFlexed size={12} />{exercise.muscleGroup}</div>
          <div className={styles.exerciseParam}><ListChecks size={12} />{exercise.equipment}</div>
          {/* {exercise.equipment && exercise.equipment !== 'none' && <div className={styles.exerciseParam}><ListChecks size={12} />{exercise.equipment}</div>} */}

        </div>
        {/* <dl className={styles.paramTable}>
          <div className={styles.paramRow}>
            <dt><ChartNoAxesColumnIncreasing />Difficulty</dt>
            <dd>{exercise.difficulty}</dd>
          </div>
          <div className={styles.paramRow}>
            <dt><BicepsFlexed />Muscle Group</dt>
            <dd>{exercise.muscleGroup}</dd>
          </div> */}
        {/* <div className={styles.paramRow}>
            <dt><Timer />Duration</dt>
            <dd>{exercise.duration}s</dd>
          </div>
          <div className={styles.paramRow}>
            <dt><ListChecks />Equipment</dt>
            <dd>{exercise.equipment}</dd>
          </div> */}
        {/* </dl> */}
      </div>

      <div className={styles.cardBtns}>
        <Button onClick={() => onViewDetails(exercise)}>
          <Eye size={16} />Details</Button>
        <Button onClick={onAddToMine}>
          <Plus size={16} />to Mine
        </Button>
      </div>

    </div>
  );
}

export default ExerciseCard;