import styles from './Select.module.css';

export function Select({ options, value, onChange, name, className = '' }) {
  return (
    <select className={`${styles.select} ${className}`} value={value} onChange={onChange} name={name}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
