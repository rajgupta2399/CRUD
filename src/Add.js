import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3030/users", inputData)
      .then((res) => {
        alert("Data Added Succesfully");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">FirstName: </label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, firstName: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="name">LastName: </label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, lastName: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            />
          </div>
          <br />
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
