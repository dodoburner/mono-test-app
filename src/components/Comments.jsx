import { useEffect } from "react";
import { Alert, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AddCommentForm from "./AddCommentForm";
import { useIsAuthenticated } from "react-auth-kit";
import Comment from "./Comment";
import commentsStore from "../stores/CommentsStore";

function Comments() {
  const { error, comments } = commentsStore;
  const params = useParams();
  const isSignedIn = useIsAuthenticated();

  useEffect(() => {
    commentsStore.fetchComments(params.id);
  }, []);

  return (
    <div>
      {error && (
        <Alert
          variant="danger m-3 flex-center position-fixed top-0 px-5"
          dismissible
        >
          {error}
        </Alert>
      )}

      <h3 className="mt-4 mb-2">Comments ({comments.length})</h3>
      <ListGroup>
        {comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </ListGroup>

      {isSignedIn() && <AddCommentForm />}
    </div>
  );
}

export default observer(Comments);
