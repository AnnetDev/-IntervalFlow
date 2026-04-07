import { useState } from 'react';
import { Modal } from '../../common/Modal/Modal';
import { Button } from '../../common/Button/Button';
import { Select } from '../../common/Select/Select';
import { Input } from '../../common/Input/Input';
import {
    DIFFICULTY_OPTIONS,
    MUSCLE_OPTIONS,
    INITIAL,
} from '../../../utils/exerciseOptionsConstants';
import styles from './CreateExerciseModal.module.css';

// Form state isn't reset when closing without saving — stale data persists if the modal is reopened
export default function CreateExerciseModal({
    isOpen,
    onClose,
    onSave,
    initialData,
}) {
    const isEditMode = !!initialData;
    const [form, setForm] = useState(initialData ?? INITIAL);
    const [errors, setErrors] = useState({});

    function validate() {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (
            form.duration &&
            (Number(form.duration) < 1 || Number(form.duration) > 3600)
        )
            errs.duration = 'Duration must be between 1 and 3600 seconds';
        return errs;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        const sanitized =
            name === 'duration' ? value.replace(/\D/g, '') : value;
        setForm((prev) => ({ ...prev, [name]: sanitized }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        onSave({
            ...form,
            duration: form.duration ? Number(form.duration) : null,
        });
        setForm(INITIAL);
        setErrors({});
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3 className={styles.title}>
                {isEditMode ? 'Edit Exercise' : 'New Exercise'}
            </h3>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.field}>
                    <span className={styles.label}>
                        Name <span className={styles.required}>*</span>
                    </span>
                    <Input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Jump Squats"
                        maxLength={100}
                    />
                    {errors.name && (
                        <span className={styles.error}>{errors.name}</span>
                    )}
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Difficulty</span>
                    {/* These Select onChange handlers bypass handleChange, skipping its error-clearing logic */}
                    <Select
                        name="difficulty"
                        options={DIFFICULTY_OPTIONS}
                        value={form.difficulty}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                difficulty: e.target.value,
                            }))
                        }
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Muscle Group</span>
                    <Select
                        name="muscleGroup"
                        options={MUSCLE_OPTIONS}
                        value={form.muscleGroup}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                muscleGroup: e.target.value,
                            }))
                        }
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Duration (seconds)</span>
                    <Input
                        name="duration"
                        value={form.duration}
                        onChange={handleChange}
                        placeholder="Not set"
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                    {errors.duration && (
                        <span className={styles.error}>{errors.duration}</span>
                    )}
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Equipment</span>
                    <Input
                        name="equipment"
                        value={form.equipment}
                        onChange={handleChange}
                        placeholder="Not set"
                        maxLength={100}
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Description</span>
                    <textarea
                        className={styles.textarea}
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Not set"
                        maxLength={500}
                        rows={3}
                    />
                </label>

                <div className={styles.actions}>
                    <Button type="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </Modal>
    );
}
