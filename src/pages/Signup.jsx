/*eslint-disable*/
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import API_URL from '../common/data';

export default function Signup() {
  const [loginError, setLoginError] = useState('');
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { username, email, password, confirmPassword } = data;

    try {
      const body = {
        username,
        email,
        password,
        confirmPassword,
        activationUrl:
          'http://localhost:3000/activate?activationToken={activationToken}',
      };
      const response = await axios.post(`${API_URL}register`, body);
      if (response.status === 200) {
        setMessage('Please check your email to confirm you account');
      }
    } catch (err) {
      console.log('Error: ', err);

      if (err && err instanceof AxiosError) {
        setLoginError(err.response.data.error_description);
      } else if (err && err instanceof Error) setLoginError(err.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      {loginError && (
        <Alert variant="danger m-3 flex-center position-fixed top-0 px-5">
          {loginError}
        </Alert>
      )}

      {message && (
        <Alert variant="success m-3 flex-center position-fixed top-0 px-5">
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...register('username', { required: 'This field is required' })}
            type="text"
            isInvalid={!!errors.username}
          />

          <Form.Control.Feedback type="invalid">
            {errors.username?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...register('email', { required: 'This field is required' })}
            type="email"
            placeholder="Enter email"
            isInvalid={!!errors.email}
          />

          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>

          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password length must be atleast 8 charachters',
              },
              pattern: {
                value: /^(?=.*[^a-zA-Z0-9]).+$/,
                message:
                  'Password must contains at least one non-alphanumeric character',
              },
            })}
            type="password"
            isInvalid={!!errors.password}
          />

          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === watch('password') || 'Passwords do not match',
            })}
            type="password"
            isInvalid={!!errors.confirmPassword}
          />

          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign-up
        </Button>

        <Link className="d-block mt-3" to="/login">
          Already have an account? Login here
        </Link>
      </Form>
    </div>
  );
}
