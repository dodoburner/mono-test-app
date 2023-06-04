import { useContext, useEffect, useState } from "react";
import API_URL from "../common/data";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import { useAuthHeader } from "react-auth-kit";
import VehiclesContext from "../common/context/vehiclesContext";

export default function VehicleEditPage() {
  const [vehicle, setVehicle] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const authToken = useAuthHeader();
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const vehiclesStore = useContext(VehiclesContext);
  const { makes } = vehiclesStore;

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(
          `${API_URL}resources/VehicleModel/${params.id}`
        );
        setVehicle(res.data);
      } catch (err) {
        console.log("Error: ", err);
        setApiError(err.message);
      }
    };

    fetchVehicle();
  }, []);

  const onSubmit = async (data) => {
    try {
      const config = {
        headers: { Authorization: authToken() },
      };
      const res = await axios.put(
        `${API_URL}resources/VehicleModel/${params.id}`,
        data,
        config
      );

      if (res.status === 204) {
        setSuccessMsg("Successfully updated the vehicle!");
      }
    } catch (err) {
      console.log("Error: ", err);
      setApiError(err.message);
    }
  };

  const onDelete = async () => {
    try {
      const config = {
        headers: { Authorization: authToken() },
      };
      const res = await axios.delete(
        `${API_URL}resources/VehicleModel/${params.id}`,
        config
      );

      if (res.status === 204) {
        setSuccessMsg(
          "Successfully deleted the vehicle! Redirecting you to the main page."
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      console.log("Error: ", err);
      setApiError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      {apiError && (
        <Alert
          variant="danger m-3 flex-center position-fixed top-0 px-5"
          dismissible
        >
          {apiError}
        </Alert>
      )}

      {successMsg && (
        <Alert
          variant="success m-3 flex-center position-fixed top-0 px-5"
          dismissible
        >
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
