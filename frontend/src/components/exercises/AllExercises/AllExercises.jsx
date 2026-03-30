import { useFetchData } from '../../../hooks/useFetchData';
import { useModal } from '../../../hooks/useModal';
import { useLocalExercises } from '../../../hooks/useLocalExercises';
import { useToast } from '../../../hooks/useToast';
import { useExerciseFilters } from '../../../hooks/useExerciseFilters';
import { Loader } from '../../common/Loader/Loader';
import { Toast } from '../../common/Toast/Toast';
import { ExerciseFilters } from '../ExerciseFilters/ExerciseFilters';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import ExerciseDetailsModal from '../ExerciseDetailsModal/ExerciseDetailsModal';
import styles from './AllExercises.module.css';

const AllExercises = () => {
  const { data: allExercises = [], isLoading, error } = useFetchData();
  const { filtered: exercises, selectOptions, handleClearFilters } = useExerciseFilters(allExercises);
  const { isOpen, modalData, openModal, closeModal } = useModal();
  const { copyFromLibrary } = useLocalExercises();
  const { message, showToast } = useToast();

  function handleAddToMine(exercise) {
    const added = copyFromLibrary(exercise);
    showToast(added
      ? `"${exercise.name}" added to My Exercises`
      : `"${exercise.name}" is already in My Exercises`
    );
  }

  return (
    <div className={styles.allExercises}>
      <h2 className='visuallyHidden'>Exercise Library</h2>

      <ExerciseFilters
        selectOptions={selectOptions}
        onClearFilters={handleClearFilters}
        exerciseCount={exercises.length}
        isLoading={isLoading}
      />

      <div className={styles.exercisesWrap}>
        {isLoading ? <Loader /> : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <ul className={styles.exerciseList}>
            {exercises.map(exercise => (
              <li key={exercise._id}>
                <ExerciseCard exercise={exercise} onViewDetails={openModal} onAddToMine={() => handleAddToMine(exercise)} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <Toast message={message} />
      <ExerciseDetailsModal isOpen={isOpen} onClose={closeModal} exercise={modalData} onAddToMine={() => { handleAddToMine(modalData); closeModal(); }} />
    </div>
  );
};

export default AllExercises;
