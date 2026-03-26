import styles from './Button.module.css';
export function Button({ children, onClick, disabled, className, type, variant }) {
  return (
    <button className={`${styles.button} ${variant ? styles[variant] : ''} ${className ?? ''}`} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
}