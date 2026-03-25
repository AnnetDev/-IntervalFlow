import { Button } from '../common/Button/Button';
import { Plus, LayersPlus } from 'lucide-react';
import styles from './MyExercises.module.css';
import { useModal } from '../../hooks/useModal';
import CreateExerciseModal from './CreateExerciseModal';


const MyExercises = ({ onSwitchToAll }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <h2>My Exercises</h2>
      <div className={styles.btnsWrapper}>
        <Button onClick={openModal}>
          <Plus size={14} /> Create new
        </Button>
        <Button onClick={onSwitchToAll}>
          <LayersPlus size={14} /> Add from Library
        </Button>
      </div>


      <p>This is the My Exercises tab. Your personal exercises will be displayed here.</p>

      <CreateExerciseModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default MyExercises;