import { useContext } from "react";
import axios from "axios";
import API_URL from "../common/data";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UserContext from "../common/context/userContext";
import { useForm } from "react-hook-form";
import { useAuthHeader } from "react-auth-kit";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

function AddCommentForm({ setApiError, setComments }) {
  const userStore = useContext(UserContext);
  const { user } = userStore;
  const params = useParams();
  const authToken = useAuthHeader();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const config = {
        headers: { Authorization: authToken() },
      };
      const body = {
        Text: data.Text,
        UserId: user.id,
        VehicleId: params.id,
        Username: user.displayName,
      };
      const res = await axios.post(`${API_URL}resources/Comment`, body, config);

      if (res.status === 201) {
        setComments((prev) => [...prev, res.data]);
        reset();
      }
    } catch (err) {
      console.log("Error: ", err);
      setApiError(err.message);
    }
  };

  return (
    <Form className="my-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Form.Group className="my-1" controlId="name">
          <Form.Label>Add Comment</Form.Label>
          <Form.Control
            {...register("Text", {
              required: "Comment can't be empty",
            })}
            isInvalid={!!errors.Text}
            as="textarea"
            placeholder="Leave a comment here"
          />

          <Form.Control.Feedback type="invalid">
            {errors.Text?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">submit</Button>
      </div>
    </Form>
  );
}

export default observer(AddCommentForm);
