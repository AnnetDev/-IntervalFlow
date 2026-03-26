import { useState } from 'react';
import { Modal } from '../../common/Modal/Modal';
import { Button } from '../../common/Button/Button';
import { Select } from '../../common/Select/Select';
import { Input } from '../../common/Input/Input';
import { DIFFICULTY_OPTIONS, MUSCLE_OPTIONS, INITIAL } from '../../../utils/exerciseOptionsConstants';
import styles from './CreateExerciseModal.module.css';

export default function CreateExerciseModal({ isOpen, onClose, onSave, initialData }) {
  const isEditMode = !!initialData;
  const [form, setForm] = useState(initialData ?? INITIAL);

  function handleChange(e) {
    const { name, value } = e.target;
    const sanitized = name === 'duration' ? value.replace(/\D/g, '') : value;
    setForm(prev => ({ ...prev, [name]: sanitized }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...form,
      duration: form.duration ? Number(form.duration) : null,
    });
    setForm(INITIAL);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className={styles.title}>{isEditMode ? 'Edit Exercise' : 'New Exercise'}</h3>
      <form className={styles.form} onSubmit={handleSubmit}>

        <label className={styles.field}>
          <span className={styles.label}>Name <span className={styles.required}>*</span></span>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Jump Squats"
            required
            maxLength={100}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Difficulty</span>
          <Select
            options={DIFFICULTY_OPTIONS}
            value={form.difficulty}
            onChange={(e) => setForm(prev => ({ ...prev, difficulty: e.target.value }))}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Muscle Group</span>
          <Select
            options={MUSCLE_OPTIONS}
            value={form.muscleGroup}
            onChange={(e) => setForm(prev => ({ ...prev, muscleGroup: e.target.value }))}
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
          <Button type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>

      </form>
    </Modal>
  );
}
