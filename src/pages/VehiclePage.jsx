import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../common/data";
import { Alert, Card } from "react-bootstrap";

function VehiclePage() {
  const [apiError, setApiError] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(
          `${API_URL}resources/VehicleModel/${params.id}`
        );
        setVehicle(res.data);
      } catch (err) {
        console.log("Error: ", err);
        setApiError(err.message);
      }
    };

    fetchVehicle();
  }, []);

  return (
    <div className="container d-flex justify-content-center">
      {apiError && (
        <Alert
          variant="danger m-3 flex-center position-fixed top-0 px-5"
          dismissible
        >
          {apiError}
        </Alert>
      )}

      {vehicle && (
        <Card className="w-50">
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
      )}
    </div>
  );
}

export default observer(VehiclePage);
