export const sortOptions = [
  "Vehicle Name [a-z]",
  "Vehicle Name [z-a]",
  "Vehicle Abrv [a-z]",
  "Vehicle Abrv [z-a]",
];

const sorter = (vehicles, sortOption) => {
  if (sortOption === sortOptions[0]) {
    return vehicles.sort((a, b) => a.Name.localeCompare(b.Name));
  }

  if (sortOption === sortOptions[1]) {
    return vehicles.sort((a, b) => b.Name.localeCompare(a.Name));
  }

  if (sortOption === sortOptions[2]) {
    return vehicles.sort((a, b) => a.Abrv.localeCompare(b.Abrv));
  }

  if (sortOption === sortOptions[3]) {
    return vehicles.sort((a, b) => b.Abrv.localeCompare(a.Abrv));
  }
};

export default sorter;
