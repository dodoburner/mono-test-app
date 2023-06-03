import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../common/context/userContext";

function Vehicle({ vehicle }) {
  const userStore = useContext(UserContext);
  const { isAdmin } = userStore;
  const { Name, Img, id } = vehicle;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={Img} style={{ height: "175px" }} />
      <Card.Body>
        <Card.Title>{Name}</Card.Title>
        <div className="d-flex justify-content-between">
          <Button variant="primary">
            <Link to={`/vehicles/${id}`}>See More</Link>
          </Button>

          {isAdmin && (
            <Button variant="warning">
              <Link to={`/vehicles/${id}/edit`} className="text-light">
                Edit
              </Link>
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default observer(Vehicle);
