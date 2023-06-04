import Pagination from "react-bootstrap/Pagination";

export default function PaginationComponent({
  vehicleCount,
  activePage,
  setActivePage,
}) {
  const pages = Math.ceil(vehicleCount / 8);
  let items = [];

  for (let i = 1; i <= pages; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === activePage}
        onClick={() => setActivePage(i)}
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
