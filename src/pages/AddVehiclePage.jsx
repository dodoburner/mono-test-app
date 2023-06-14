import { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import { useAuthHeader } from "react-auth-kit";
import VehiclesContext from "../common/context/vehiclesContext";
import { observer } from "mobx-react-lite";

function AddVehiclePage() {
  const authToken = useAuthHeader();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const vehiclesStore = useContext(VehiclesContext);
  const { makes, error, successMsg } = vehiclesStore;

  const onSubmit = (data) => {
    vehiclesStore.addVehicle(data, authToken());
  };

  return (
    <div className="container d-flex justify-content-center">
      {error && (
        <Alert variant="danger m-3 flex-center position-fixed top-0 px-5">
          {error}
        </Alert>
      )}

      {successMsg && (
        <Alert variant="success m-3 flex-center position-fixed top-0 px-5">
          {successMsg}
        </Alert>
      )}

      <div className="w-50">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Vehicle Name</Form.Label>
            <Form.Control
              {...register("Name", {
                required: "This field is required",
              })}
              type="text"
              isInvalid={!!errors.Name}
            />

            <Form.Control.Feedback type="invalid">
              {errors.Name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="abbreviation">
            <Form.Label>Vehicle Abbreviation</Form.Label>
            <Form.Control
              {...register("Abrv", {
                required: "This field is required",
              })}
              type="text"
              isInvalid={!!errors.Abrv}
            />

            <Form.Control.Feedback type="invalid">
              {errors.Abrv?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Vehicle Image Link</Form.Label>
            <Form.Control
              {...register("Img", {
                required: "This field is required",
              })}
              type="text"
              isInvalid={!!errors.Img}
            />

            <Form.Control.Feedback type="invalid">
              {errors.Img?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="makes">
            <Form.Select aria-label="select make" {...register("MakeId")}>
              {makes.map((make) => {
                return (
                  <option key={make.id} value={make.id}>
                    {make.Name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Vehicle
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default observer(AddVehiclePage);
