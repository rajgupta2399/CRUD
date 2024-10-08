import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams(); // Destructure id from useParams
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const navigate = useNavigate();

  // Fetch the user data by id
  useEffect(() => {
    axios
      .get(`http://localhost:3030/users/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3030/users/${id}`, data)
      .then((res) => {
        console.log("User updated successfully");
        navigate("/")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-light p-5">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">First Name: </label>
              <input
                type="text"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div>
              <label htmlFor="lastName">Last Name: </label>
              <input
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div>
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <br />
            <button className="btn btn-info" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Update;
