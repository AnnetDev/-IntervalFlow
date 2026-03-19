import { useState, useEffect } from 'react';
import { Input } from "../common/Button/Input";
import { Select } from "../common/Button/Select";
import { Button } from "../common/Button/Button";
import ExerciseCard from "./ExerciseCard";
import { getAllExercises } from '../../services/api';


const AllExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [equipment, setEquipment] = useState('');


  const selectOptions = [
    { name: 'Difficulty', availableOptions: ['show all', 'easy', 'medium', 'hard'], value: difficulty, onChange: setDifficulty },
    { name: 'Muscle Group', availableOptions: ['show all', 'arms', 'legs', 'core'], value: muscleGroup, onChange: setMuscleGroup },
    { name: 'Equipment', availableOptions: ['show all', 'dumbbells', 'barbell'], value: equipment, onChange: setEquipment }
  ];

  useEffect(() => {
    getAllExercises()
      .then(data => setExercises(data))
      .catch(error => console.error('Error fetching exercises:', error));
  }, []);

  return (
    <div>
      <h2>All Exercises</h2>
      {/* //fetch and display all exercises */}
      <div>
        <h3>Search:</h3>
        <Input placeholder=" ..." />
      </div>

      <div>
        <h3>Filters:</h3>
        {selectOptions.map((option) => (
          <div key={option.name}>
            <h4>{option.name}</h4>
            <Select options={option.availableOptions.map(value => ({ value, label: value }))} value={option.value} onChange={(e) => { option.onChange(e.target.value) }} />
          </div>
        ))}
        <Button onClick={() => { /* Clear filters */ }}>Clear Filters</Button>
      </div>

      <div>
        <h3>Showing {exercises.length} exercises</h3>
        {/* //display exercises in a grid */}


        <ul>
          {exercises.map(exercise => (
            <li key={exercise._id}>
              <ExerciseCard exercise={exercise} />
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
};

export default AllExercises;