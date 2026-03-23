import styles from './ExerciseCard.module.css';
import { Button } from '../common/Button/Button';
import { BicepsFlexed, Timer, ChartNoAxesColumnIncreasing, ListChecks } from 'lucide-react';

const ExerciseCard = ({ exercise }) => {

  return (
    <div className={styles.exerciseCard}>

      <div className={styles.exerciseInfo}>
        <div className={styles.badge}>Badge</div>
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
      </div>

      <div className={styles.cardBtns}>
        <Button onClick={() => { /* View details */ }}>View Details</Button>
        <Button onClick={() => { /* Add to training plan */ }}>Add to Mine</Button>
      </div>

    </div>
  );
}

export default ExerciseCard;