import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert, Card } from "react-bootstrap";
import Comments from "../components/Comments";
import { observer } from "mobx-react-lite";
import VehiclesContext from "../common/context/vehiclesContext";

function VehiclePage() {
  const vehiclesStore = useContext(VehiclesContext)
  const { error, vehicle } = vehiclesStore;
  const params = useParams();

  useEffect(() => {
    vehiclesStore.fetchVehicle(params.id);
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center">
      {error && (
        <Alert
          variant="danger m-3 flex-center position-fixed top-0 px-5"
          dismissible
        >
          {error}
        </Alert>
      )}

      {vehicle && (
        <div className="w-50">
          <Card>
            <Card.Img
              variant="top"
              src={vehicle.Img}
              style={{ height: "400px" }}
            />
            <Card.Body>
              <Card.Title className="fs-2">
                {vehicle.Name}{" "}
                <span className="fs-3 fst-italic text-secondary">
                  ({vehicle.Abrv})
                </span>
              </Card.Title>
            </Card.Body>
          </Card>
          <Comments />
        </div>
      )}
    </div>
  );
}

export default observer(VehiclePage);
