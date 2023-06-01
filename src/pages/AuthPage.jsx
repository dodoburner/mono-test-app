import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

export default function AuthPage() {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div>
      {isRegistered ? <Signup /> : <Login />}{' '}
      <button type="button" onClick={() => setIsRegistered(!isRegistered)}>
        {isRegistered ? "Don't have an account?" : 'Already registered?'}
      </button>
    </div>
  );
}
