import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import { useAuthHeader } from "react-auth-kit";
import VehiclesContext from "../common/context/vehiclesContext";
import { observer } from "mobx-react-lite";

function VehicleEditPage() {
  const vehiclesStore = useContext(VehiclesContext);
  const { error, vehicle, makes, successMsg } = vehiclesStore;
  const authToken = useAuthHeader();
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    vehiclesStore.fetchVehicle(params.id);
    return () => {
      vehiclesStore.clearVehicle();
    };
  }, []);

  useEffect(() => {
    if (successMsg && successMsg.includes("deleted")) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [successMsg]);

  const onSubmit = (data) => {
    vehiclesStore.updateVehicle(data, authToken(), params.id);
  };

  const onDelete = () => {
    vehiclesStore.deleteVehicle(authToken(), params.id);
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

      {vehicle && (
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
                defaultValue={vehicle.Name}
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
                defaultValue={vehicle.Abrv}
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
                defaultValue={vehicle.Img}
              />

              <Form.Control.Feedback type="invalid">
                {errors.Img?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="makes">
              <Form.Select
                aria-label="select make"
                {...register("MakeId")}
                defaultValue={vehicle.MakeId}
              >
                {makes.map((make) => {
                  return (
                    <option key={make.id} value={make.id}>
                      {make.Name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Edit Vehicle
              </Button>

              <Button variant="danger" type="button" onClick={onDelete}>
                Delete Vehicle
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}

export default observer(VehicleEditPage);
