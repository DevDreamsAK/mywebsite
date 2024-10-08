import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: ""
  });

  const { id } = useParams(); // Get the user ID from the route params

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/users/${id}`);
      setUser(result.data); // Set the user data in the state
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of User Id: {id}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Name: </b> {user.name}
              </li>
              <li className="list-group-item">
                <b>Username: </b> {user.username}
              </li>
              <li className="list-group-item">
                <b>Email: </b> {user.email}
              </li>
            </ul>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
