import { useContext, useEffect, useState } from "react";
import VehiclesContext from "../common/context/vehiclesContext";
import { observer } from "mobx-react-lite";
import Vehicle from "../components/Vehicle";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginationComponent from "../components/Pagination";

function VehiclesPage() {
  const vehiclesStore = useContext(VehiclesContext);
  const { vehicles, makes } = vehiclesStore;
  const [filter, setFilter] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [vehicleCount, setVehicleCount] = useState(vehicles.length);

  useEffect(() => {
    vehiclesStore.fetchVehicles();
  }, []);

  const renderVehicles = () => {
    let filteredVehicles = vehicles;

    if (filter) {
      filteredVehicles = vehicles.filter((el) => el.MakeId === filter);
    }

    if (vehicleCount !== filteredVehicles.length) {
      setVehicleCount(filteredVehicles.length);
    }

    const lastVehicleIndex = activePage * 8;
    const firstVehicleIndex = lastVehicleIndex - 8;
    const currentVehicles = filteredVehicles.slice(
      firstVehicleIndex,
      lastVehicleIndex
    );

    return currentVehicles.map((vehicle) => (
      <Col key={vehicle.id} className="mb-4 mt-4">
        <Vehicle vehicle={vehicle} />
      </Col>
    ));
  };

  return (
    <Container fluid>
      <div>
        <Form.Select
          aria-label="Filter Vehicles by Make"
          onChange={(e) => setFilter(e.target.value)}
          className="w-25"
        >
          <option value="">Filter by Make</option>
          {makes.map((make) => {
            return (
              <option key={make.id} value={make.id}>
                {make.Name}
              </option>
            );
          })}
        </Form.Select>

        <PaginationComponent
          vehicleCount={vehicleCount}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>

      <Row>{renderVehicles()}</Row>

      <Button type="button" variant="primary">
        <Link to="/add-vehicle">+ Add Vehicle</Link>
      </Button>
    </Container>
  );
}

export default observer(VehiclesPage);
