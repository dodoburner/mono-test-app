import { useContext, useEffect, useState } from "react";
import VehiclesContext from "../common/context/vehiclesContext";
import { observer } from "mobx-react-lite";
import Vehicle from "../components/Vehicle";
import { Col, Container, Row } from "react-bootstrap";
import PaginationComponent from "../components/Pagination";
import Sidebar from "../components/Sidebar";

function VehiclesPage() {
  const vehiclesStore = useContext(VehiclesContext);
  const { vehicles } = vehiclesStore;
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
      <Col key={vehicle.id} className="mb-4 mt-4 vehicle-col">
        <Vehicle vehicle={vehicle} />
      </Col>
    ));
  };

  return (
    <div className="d-flex mx-3">
      <Sidebar setFilter={setFilter} />

      <Container fluid className="container">
        <PaginationComponent
          vehicleCount={vehicleCount}
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <Row>{renderVehicles()}</Row>
      </Container>
    </div>
  );
}

export default observer(VehiclesPage);
