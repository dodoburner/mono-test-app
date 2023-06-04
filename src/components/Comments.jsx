import { useContext, useEffect, useState } from "react";
import { Alert, Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import API_URL from "../common/data";
import { useParams } from "react-router-dom";
import UserContext from "../common/context/userContext";
import { observer } from "mobx-react-lite";

function Comments() {
  const userStore = useContext(UserContext);
  const { user } = userStore;
  const [comments, setComments] = useState([]);
  const [apiError, setApiError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const searchQuery = `WHERE VehicleId = '${params.id}'`;
        const res = await axios.get(
          `${API_URL}resources/Comment/?searchQuery=${searchQuery}`
        );
        console.log(res);
        setComments(res.data.item);
      } catch (err) {
        console.log("Error: ", err);
        setApiError(err.message);
      }
    };

    fetchComments();
  }, []);

  return (
    <div>
      {apiError && (
        <Alert
          variant="danger m-3 flex-center position-fixed top-0 px-5"
          dismissible
        >
          {apiError}
        </Alert>
      )}

      <h3 className="mt-4 mb-2">Comments ({comments.length})</h3>
      <ListGroup>
        {comments.map((comment) => {
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
                <Button variant="danger" type="button">
                  delete
                </Button>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

export default observer(Comments);
