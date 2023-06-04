import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import API_URL from "../common/data";

export default function Login() {
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { username, password } = data;

    try {
      const config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      const body = {
        username,
        password,
        grant_type: "password",
      };
      const res = await axios.post(`${API_URL}login`, body, config);
      const { access_token, expires_in, token_type } = res.data;

      if (
        signIn({
          token: access_token,
          expiresIn: expires_in,
          tokenType: token_type,
          authState: {},
        })
      ) {
        navigate("/");
      }
    } catch (err) {
      console.log("Error: ", err);
      setLoginError(err.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      {loginError && (
        <Alert variant="danger m-3 flex-center position-fixed top-0 px-5">
          {loginError}
        </Alert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...register("username", { required: "This field is required" })}
            type="text"
            isInvalid={!!errors.username}
          />

          <Form.Control.Feedback type="invalid">
            {errors.username?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password length must be atleast 8 charachters",
              },
              pattern: {
                value: /^(?=.*[^a-zA-Z0-9]).+$/,
                message:
                  "Password must contains at least one non-alphanumeric character",
              },
            })}
            type="password"
            isInvalid={!!errors.password}
          />

          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>

        <Link className="d-block mt-3" to="/signup">
          Dont have an account? Sign-up here
        </Link>
      </Form>
    </div>
  );
}
