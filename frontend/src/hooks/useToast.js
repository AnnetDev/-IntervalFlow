import { useState } from 'react';

export function useToast(duration = 5000) {
  const [message, setMessage] = useState('');

  // Rapid calls create overlapping timeouts — an earlier timeout can clear a later toast prematurely.
  // Store the timeout ID in a ref and clear it before setting a new one.
  function showToast(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(''), duration);
  }

  return { message, showToast };
}
