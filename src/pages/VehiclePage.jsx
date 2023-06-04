import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../common/data";
import { Alert, Card } from "react-bootstrap";
import Comments from "../components/Comments";

export default function VehiclePage() {
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
    <div className="container d-flex flex-column align-items-center">
      {apiError && (
        <Alert
          variant="danger m-3 flex-center position-fixed top-0 px-5"
          dismissible
        >
          {apiError}
        </Alert>
      )}

      {vehicle && (
        <div>
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
