import styles from './Select.module.css';

export function Select({ options, value, onChange, className = '' }) {
  return (
    <select className={`${styles.select} ${className}`} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
