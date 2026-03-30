import { useState } from 'react';

export function useToast(duration = 5000) {
  const [message, setMessage] = useState('');

  function showToast(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(''), duration);
  }

  return { message, showToast };
}
