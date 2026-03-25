import styles from './Toast.module.css';

export function Toast({ message }) {
  if (!message) return null;
  return <div className={styles.toast}>{message}</div>;
}
