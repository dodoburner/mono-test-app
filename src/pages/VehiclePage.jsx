/* eslint-disable */
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VehiclesContext from '../common/storeContext';
import API_URL from '../common/data';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

function VehiclePage() {
  const vehiclesStore = useContext(VehiclesContext);
  const [vehicle, setVehicle] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const config = { headers: { Accept: 'application/hal+json' } };
        const res = await axios.get(
          `${API_URL}resources/VehicleModel/${params.id}`,
          config
        );
        setVehicle(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchVehicle();
  }, []);

  console.log(vehicle)

  return (
    <div className="container d-flex justify-content-center">
      {vehicle && (
        <Card className="w-50">
          <Card.Img
            variant="top"
            src={vehicle.Img}
            style={{ height: '400px' }}
          />
          <Card.Body>
            <Card.Title className="fs-2">
              {vehicle.Name}{' '}
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
