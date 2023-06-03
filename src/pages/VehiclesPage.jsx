/* eslint-disable */
import { useContext, useEffect } from 'react';
import VehiclesContext from '../common/context/vehiclesContext';
import { observer } from 'mobx-react-lite';
import Vehicle from '../components/Vehicle';
import { Col, Container, Row } from 'react-bootstrap';

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
    </Container>
  );
}

export default observer(VehiclesPage);
