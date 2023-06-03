import { observer } from 'mobx-react-lite';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Vehicle({ vehicle }) {
  const { Name, Abrv, Img, id } = vehicle;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={Img} style={{ height: '175px' }} />
      <Card.Body>
        <Card.Title>{Name}</Card.Title>
        <Button variant="primary">
          <Link to={`/vehicles/${id}`}>See More</Link>
        </Button>
      </Card.Body>
    </Card>
  );
}

export default observer(Vehicle);
