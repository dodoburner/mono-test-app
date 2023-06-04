import { observer } from "mobx-react-lite";
import { useContext } from "react";
import UserContext from "../common/context/userContext";
import { Button, ListGroup } from "react-bootstrap";
import { useAuthHeader } from "react-auth-kit";
import axios from "axios";
import API_URL from "../common/data";

function Comment({ comment, setComments, setApiError }) {
  const userStore = useContext(UserContext);
  const { user } = userStore;
  const authToken = useAuthHeader();

  const onDelete = async () => {
    try {
      const config = {
        headers: { Authorization: authToken() },
      };
      const res = await axios.delete(
        `${API_URL}resources/Comment/${comment.id}`,
        config
      );

      if (res.status === 204) {
        setComments((prev) => {
          return prev.filter((el) => el.id !== comment.id);
        });
      }
    } catch (err) {
      console.log("Error: ", err);
      setApiError(err.message);
    }
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
