import { useContext, useEffect } from "react";
import VehiclesContext from "../common/context/vehiclesContext";
import { observer } from "mobx-react-lite";
import Vehicle from "../components/Vehicle";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function VehiclesPage() {
  const vehiclesStore = useContext(VehiclesContext);
  const { vehicles } = vehiclesStore;

  useEffect(() => {
    vehiclesStore.fetchVehicles();
  }, []);

  return (
    <Container fluid>
      <Row>
        {vehicles.map((vehicle) => (
          <Col key={vehicle.id} className="mb-4">
            <Vehicle vehicle={vehicle} />
          </Col>
        ))}
      </Row>

      <Button type="button" variant="primary">
        <Link to="/add-vehicle">+ Add Vehicle</Link>
      </Button>
    </Container>
  );
}

export default observer(VehiclesPage);
