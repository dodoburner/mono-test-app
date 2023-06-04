import { observer } from "mobx-react-lite";
import { useContext } from "react";
import UserContext from "../common/context/userContext";
import { Button, ListGroup } from "react-bootstrap";

function Comment({ comment, setComments }) {
  const userStore = useContext(UserContext);
  const { user } = userStore;

  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
      key={comment.id}
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{comment.Username}</div>
        {comment.Text}
      </div>

      {comment.UserId === user?.id && (
        <Button variant="danger align-self-center" type="button">
          delete
        </Button>
      )}
    </ListGroup.Item>
  );
}

export default observer(Comment);
