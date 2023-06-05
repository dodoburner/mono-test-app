import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import VehiclesContext from "../common/context/vehiclesContext";
import { Link } from "react-router-dom";
import UserContext from "../common/context/userContext";

function Sidebar({ setFilter }) {
  const vehiclesStore = useContext(VehiclesContext);
  const userStore = useContext(UserContext);
  const { makes } = vehiclesStore;
  const { user, isAdmin } = userStore;

  return (
    <Nav className="flex-column gap-3">
      <Nav.Item>
        <Form.Select
          aria-label="Filter Vehicles by Make"
          onChange={(e) => setFilter(e.target.value)}
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
      </Nav.Item>

      {user && isAdmin && (
        <Nav.Item>
          <Link to="/add-vehicle">
            <Button type="button" variant="primary">
              + Add Vehicle
            </Button>
          </Link>
        </Nav.Item>
      )}
    </Nav>
  );
}

export default observer(Sidebar);
