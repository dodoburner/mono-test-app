/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ActivationPage() {
  const [message, setMessage] = useState('Please wait...');
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const activationToken = urlParams.get('activationToken');

    const activateUser = async (token) => {
      if (!token) {
        setMessage('Must include activation token');
        return;
      }

      try {
        const res = await axios.put(
          `${API_URL}register/activate/${token}`
        );

        if (res.status === 200) {
          setMessage(
            'You have succesfully activated your account! Redirecting you to the login page'
          );
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } catch (err) {
        console.log(err);
        setMessage('Account activation failed');
      }
    };

    activateUser(activationToken);
  }, []);

  return <div className="container mt-5 fs-5">{message}</div>;
}
