import styles from './ExerciseCard.module.css';
import { Button } from '../common/Button/Button';

const ExerciseCard = ({ exercise }) => {

  return (
    <div className={styles.exerciseCard}>

      <div className={styles.exerciseInfo}>
        <div className={styles.badge}>Badge</div>
        <h3 className={styles.exerciseName}>{exercise.name}</h3>
        <p className={styles.parameters}>Difficulty: {exercise.difficulty}</p>
        <p className={styles.parameters}>Muscle Group: {exercise.muscleGroup}</p>
        <p className={styles.parameters}>Recommended Duration: {exercise.duration} seconds</p>
        <p className={styles.parameters}>Equipment: {exercise.equipment}</p>

      </div>

      <div>
        <Button onClick={() => { /* View details */ }}>View Details</Button>
        <Button onClick={() => { /* Add to training plan */ }}>Add to Mine</Button>
      </div>

    </div>
  );
}

export default ExerciseCard;