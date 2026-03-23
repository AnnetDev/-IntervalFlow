import { useState } from 'react';
// import { useEffect } from 'react'; // removed — fetch moved to hook
import { Select } from '../common/Button/Select';
import { Button } from '../common/Button/Button';
import ExerciseCard from './ExerciseCard';
// import { getAllExercises } from '../../services/api'; // replaced by useFetchData
import styles from './AllExercises.module.css';
import { useFetchData } from '../../hooks/useFetchData';
import { Loader } from '../common/Loader/Loader';

const AllExercises = () => {
  // const [exercises, setExercises] = useState([]); // replaced by hook data
  const [difficulty, setDifficulty] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [equipment, setEquipment] = useState('');
  const { data: exercises = [], isLoading } = useFetchData({ difficulty, muscleGroup, equipment });

  const selectOptions = [
    { name: 'Difficulty', options: getSelectOptions(exercises, 'difficulty'), value: difficulty, onChange: setDifficulty },
    { name: 'Muscle Group', options: getSelectOptions(exercises, 'muscleGroup'), value: muscleGroup, onChange: setMuscleGroup },
    { name: 'Equipment', options: getSelectOptions(exercises, 'equipment'), value: equipment, onChange: setEquipment },
  ];

  // useEffect(() => {
  //   getAllExercises({ difficulty, muscleGroup, equipment })
  //     .then(data => setExercises(data))
  //     .catch(error => console.error('Error fetching exercises:', error));
  // }, [difficulty, muscleGroup, equipment]);

  function getSelectOptions(exercises, field) {
    const unique = [...new Set(exercises.map(ex => ex[field]).filter(Boolean))];
    return [{ value: '', label: 'Show all' }, ...unique.map(v => ({ value: v, label: v }))];
  }

  function handleClearFilters() {
    setDifficulty('');
    setMuscleGroup('');
    setEquipment('');
  }

  return (
    <div className={styles.allExercises}>
      <h2 className='visuallyHidden'>All Exercises</h2>
      {/* TODO for future: add search */}

      <div className={styles.filtersWrapper} >
        <div>
          <h3>Filters:</h3>
          <div className={styles.filters}>
            {selectOptions.map((option) => (
              <div className={styles.filter} key={option.name}>
                <h4>{option.name}</h4>
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
        {/* //display exercises in a grid */}
        {isLoading ? <Loader /> : <ul className={styles.exerciseList}>
          {exercises.map(exercise => (
            <li key={exercise._id}>
              <ExerciseCard exercise={exercise} />
            </li>
          ))}
        </ul>}

      </div>


    </div>
  );
};

export default AllExercises;