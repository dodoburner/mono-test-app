import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ActivationPage() {
  const [message, setMessage] = useState('Please wait...');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const activationToken = urlParams.get('activationToken');

    const activateUser = async (token) => {
      if (!token) {
        setMessage('Must include activation token');
      } else {
        const res = await axios.put(
          `https://api.baasic.com/beta/my-first-basic-app/register/activate/${token}`
        );

        if (res.status === 200) {
          setMessage('You have succesfully activated your account');
        }
      }
    };

    activateUser(activationToken);
  });

  return <div>{message}</div>;
}
