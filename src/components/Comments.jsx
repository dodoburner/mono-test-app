import { useEffect, useState } from "react";
import { Alert, ListGroup } from "react-bootstrap";
import axios from "axios";
import API_URL from "../common/data";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AddCommentForm from "./AddCommentForm";
import { useIsAuthenticated } from "react-auth-kit";
import Comment from "./Comment";

function Comments() {
  const [comments, setComments] = useState([]);
  const [apiError, setApiError] = useState(null);
  const params = useParams();
  const isSignedIn = useIsAuthenticated();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const searchQuery = `WHERE VehicleId = '${params.id}'`;
        const res = await axios.get(
          `${API_URL}resources/Comment/?searchQuery=${searchQuery}`
        );
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
            <Comment
              key={comment.id}
              comment={comment}
              setApiError={setApiError}
              setComments={setComments}
            />
          );
        })}
      </ListGroup>

      {isSignedIn() && (
        <AddCommentForm setApiError={setApiError} setComments={setComments} />
      )}
    </div>
  );
}

export default observer(Comments);
