import { useState } from 'react';
import { Select } from '../common/Button/Select';
import { Button } from '../common/Button/Button';
import ExerciseCard from './ExerciseCard';
import styles from './AllExercises.module.css';
import { useFetchData } from '../../hooks/useFetchData';
import { Loader } from '../common/Loader/Loader';
import { useModal } from '../../hooks/useModal';
import { useLocalExercises } from '../../hooks/useLocalExercises';
import { useToast } from '../../hooks/useToast';
import { Toast } from '../common/Toast/Toast';
import ExerciseDetailsModal from './ExerciseDetailsModal';
import { BicepsFlexed, ChartNoAxesColumnIncreasing, ListChecks } from 'lucide-react';

const AllExercises = () => {
  const [difficulty, setDifficulty] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [equipment, setEquipment] = useState('');
  const { data: exercises = [], isLoading } = useFetchData({ difficulty, muscleGroup, equipment });
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


  const selectOptions = [
    { name: 'Difficulty', options: getSelectOptions(exercises, 'difficulty'), value: difficulty, onChange: setDifficulty, icon: <ChartNoAxesColumnIncreasing size={12} /> },
    { name: 'Muscle Group', options: getSelectOptions(exercises, 'muscleGroup'), value: muscleGroup, onChange: setMuscleGroup, icon: <BicepsFlexed size={12} /> },
    { name: 'Equipment', options: getSelectOptions(exercises, 'equipment'), value: equipment, onChange: setEquipment, icon: <ListChecks size={12} /> },
  ];

  function getSelectOptions(exercises, field) {
    const unique = [...new Set(exercises.map(ex => ex[field]).filter(Boolean))];
    return [{ value: '', label: 'Show all' }, ...unique.map(v => ({ value: v, label: v }))];
  }

  function handleClearFilters() {
    setDifficulty('');
    setMuscleGroup('');
    setEquipment('');
  }

  //todo error msg if response !== ok
  return (
    <div className={styles.allExercises}>
      <h2 className='visuallyHidden'>Exercise Library</h2>
      {/* TODO for future: add search */}

      <div className={styles.filtersWrapper} >
        <div>
          <h3>Filters:</h3>
          <div className={styles.filters}>
            {selectOptions.map((option) => (
              <div className={styles.filter} key={option.name}>
                <div className={styles.filterTitle}>{option.icon}
                  <h4>{option.name}</h4>
                </div>
                <Select options={option.options} value={option.value} onChange={(e) => { option.onChange(e.target.value) }} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.filterResWrap}>
          <h3>{isLoading ? 'Loading...' : `Found ${exercises.length} exercises`}</h3>
          <Button className={styles.clearFiltersBtn} onClick={() => { handleClearFilters() }}>Clear Filters</Button>

        </div>
      </div>

      <div className={styles.exercisesWrap}>
        {isLoading ? <Loader /> : <ul className={styles.exerciseList}>
          {exercises.map(exercise => (
            <li key={exercise._id}>
              <ExerciseCard exercise={exercise} onViewDetails={openModal} onAddToMine={() => handleAddToMine(exercise)} />
            </li>
          ))}
        </ul>}
      </div>
      <Toast message={message} />
      <ExerciseDetailsModal isOpen={isOpen} onClose={closeModal} exercise={modalData} onAddToMine={() => { handleAddToMine(modalData); closeModal(); }} />
    </div>
  );
};

export default AllExercises;