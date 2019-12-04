import React from 'react';
import { useData } from '../hooks';
export default function ProtectedContentfulPage() {
  const { data, error } = useData('/.netlify/functions/auth/contentful');
  return (
    <div>
      {error ? JSON.stringify(error, null, 2) : JSON.stringify(data, null, 2)}
    </div>
  );
}
