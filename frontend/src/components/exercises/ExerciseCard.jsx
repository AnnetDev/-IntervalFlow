import styles from './ExerciseCard.module.css';
import { Button } from '../common/Button/Button';

const ExerciseCard = ({ exercise }) => {

  return (
    <div className={styles.exerciseCard}>
      <div>Badge</div>
      <h3>{exercise.name}</h3>
      <p>Difficulty: {exercise.difficulty}</p>
      <p>Muscle Group: {exercise.muscleGroup}</p>
      <p>Recommended Duration: {exercise.duration} seconds</p>
      <p>Equipment: {exercise.equipment}</p>

      <Button onClick={() => { /* View details */ }}>View Details</Button>
      <Button onClick={() => { /* Add to training plan */ }}>Add to Mine</Button>

    </div>
  );
}

export default ExerciseCard;