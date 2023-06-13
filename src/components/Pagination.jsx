import { observer } from "mobx-react-lite";
import { useContext } from "react";
import Pagination from "react-bootstrap/Pagination";
import VehiclesContext from "../common/context/vehiclesContext";

function PaginationComponent() {
  const vehiclesStore = useContext(VehiclesContext);
  const { totalRecords, currentPage } = vehiclesStore;

  const pages = Math.ceil(totalRecords / 8);
  let items = [];

  for (let i = 1; i <= pages; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => vehiclesStore.fetchVehicles(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>{items}</Pagination>
      <br />
    </div>
  );
}

export default observer(PaginationComponent);
