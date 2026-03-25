import { useState } from 'react';

export function useToast(duration = 4000) {
  const [message, setMessage] = useState('');

  function showToast(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(''), duration);
  }

  return { message, showToast };
}
