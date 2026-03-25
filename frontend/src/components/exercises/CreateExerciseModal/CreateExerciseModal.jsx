import { useState } from 'react';
import { Modal } from '../../common/Modal/Modal';
import { Button } from '../../common/Button/Button';
import { Select } from '../../common/Select/Select';
import { Input } from '../../common/Input/Input';
import styles from './CreateExerciseModal.module.css';

const DIFFICULTY_OPTIONS = [
  { value: '', label: 'Not set' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const MUSCLE_OPTIONS = [
  { value: '', label: 'Not set' },
  { value: 'core', label: 'Core' },
  { value: 'legs', label: 'Legs' },
  { value: 'glutes', label: 'Glutes' },
  { value: 'upper-body', label: 'Upper Body' },
  { value: 'back', label: 'Back' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'full-body', label: 'Full Body' },
  { value: 'mobility', label: 'Mobility' },
];

const INITIAL = {
  name: '',
  difficulty: '',
  muscleGroup: '',
  duration: '',
  equipment: '',
  description: '',
};

export default function CreateExerciseModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState(INITIAL);

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
      <h3 className={styles.title}>New Exercise</h3>
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
