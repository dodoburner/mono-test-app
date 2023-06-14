import { useContext } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UserContext from "../common/context/userContext";
import { useForm } from "react-hook-form";
import { useAuthHeader } from "react-auth-kit";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import commentsStore from "../stores/CommentsStore";

function AddCommentForm() {
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

  const onSubmit = (data) => {
    commentsStore.addComment(data, params.id, user, authToken());
    reset();
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
