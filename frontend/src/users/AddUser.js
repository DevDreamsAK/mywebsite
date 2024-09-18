import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();
  const [user, setUsers] = useState({
    name: "",
    username: "",
    email: "",
  });

  // Destructure the user state object
  const { name, username, email } = user;

  // Correct state update function
  const onInputChange = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/user", user);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Name"
                name="name" // Correct name attribute
                value={name}
                onChange={(e) => onInputChange(e)} // Attach onChange handler
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                name="username" // Correct name attribute
                value={username}
                onChange={(e) => onInputChange(e)} // Attach onChange handler
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Email"
                name="email" // Correct name attribute
                value={email}
                onChange={(e) => onInputChange(e)} // Attach onChange handler
              />
            </div>
            <button type="submit" className="btn btn-outline-success">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-3" to="/">
              Cancel
            </Link>{" "}
            {/* Cancel button should not be type="submit" */}
          </form>
        </div>
      </div>
    </div>
  );
}
