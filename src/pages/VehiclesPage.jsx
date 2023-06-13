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

  useEffect(() => {
    vehiclesStore.fetchVehicles(1);
  }, []);

  return (
    <div className="d-flex mx-3">
      <Sidebar />

      <Container fluid className="container">
        <PaginationComponent />

        <Row>
          {vehicles.map((vehicle) => (
            <Col key={vehicle.id} className="mb-4 mt-4 vehicle-col">
              <Vehicle vehicle={vehicle} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default observer(VehiclesPage);
