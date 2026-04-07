import styles from './ExerciseDetailsModal.module.css';
import {
    BicepsFlexed,
    Timer,
    ChartNoAxesColumnIncreasing,
    ListChecks,
    Plus,
    Pencil,
    Trash2,
    Dumbbell,
} from 'lucide-react'; // Dumbbell is imported but unused
import { Modal } from '../../common/Modal/Modal';
import { Button } from '../../common/Button/Button';

export default function ExerciseDetailsModal({
    isOpen,
    onClose,
    exercise,
    onAddToMine,
    onEdit,
    onDelete,
}) {
    // Early return before <Modal> prevents the closing animation from playing — let Modal handle visibility
    if (!isOpen || !exercise) return null;
    const isGlobal = exercise.createdBy === null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.exerciseInfo}>
                <div
                    className={`${styles.exerciseDetailsHeader} ${styles[`${exercise.difficulty}Header`]}`}
                >
                    <h3 className={styles.exerciseName}>{exercise.name}</h3>
                </div>

                <div className={styles.exerciseParams}>
                    <div
                        className={`${styles.difficultyBadge} ${styles[exercise.difficulty]}`}
                    >
                        <ChartNoAxesColumnIncreasing size={16} />
                        {exercise.difficulty}
                    </div>
                    <div className={styles.exerciseParam}>
                        <BicepsFlexed size={16} />
                        {exercise.muscleGroup}
                    </div>
                    {exercise.equipment && exercise.equipment !== 'none' && (
                        <div className={styles.exerciseParam}>
                            <ListChecks size={16} />
                            {exercise.equipment}
                        </div>
                    )}
                    <div className={styles.exerciseParam}>
                        <Timer size={16} /> {exercise.duration}s
                    </div>
                </div>
                <div className={styles.descriptionWrap}>
                    <h4 className={styles.descriptionTitle}>Description</h4>
                    <p className={styles.description}>{exercise.description}</p>
                </div>
            </div>

            <div className={styles.modalActions}>
                {isGlobal ? (
                    <Button onClick={onAddToMine} variant="add">
                        <Plus size={16} /> Add to Mine
                    </Button>
                ) : (
                    <>
                        <Button onClick={onEdit}>
                            <Pencil size={16} /> Edit
                        </Button>
                        <Button onClick={onDelete} variant="delete">
                            <Trash2 size={16} /> Delete
                        </Button>
                    </>
                )}
            </div>
        </Modal>
    );
}
