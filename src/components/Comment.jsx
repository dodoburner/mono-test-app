import { observer } from "mobx-react-lite";
import { useContext } from "react";
import UserContext from "../common/context/userContext";
import { Button, ListGroup } from "react-bootstrap";
import { useAuthHeader } from "react-auth-kit";
import commentsStore from "../stores/CommentsStore";

function Comment({ comment }) {
  const userStore = useContext(UserContext);
  const { user } = userStore;
  const authToken = useAuthHeader();

  const onDelete = () => {
    commentsStore.deleteComment(comment.id, authToken());
  };

  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{comment.Username}</div>
        {comment.Text}
      </div>

      {comment.UserId === user?.id && (
        <Button
          variant="danger align-self-center"
          type="button"
          onClick={onDelete}
        >
          delete
        </Button>
      )}
    </ListGroup.Item>
  );
}

export default observer(Comment);
