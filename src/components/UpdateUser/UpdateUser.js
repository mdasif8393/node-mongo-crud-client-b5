import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  //get a user data
  const [user, setUser] = useState({});
  useEffect(() => {
    const url = `http://localhost:5000/user/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [user]);

  //update a user data
  const updateUsertoDatabase = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };

    //send data to server
    const url = `http://localhost:5000/user/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("update user successfully");
          e.target.reset();
        }
      });
  };
  return (
    <div>
      <h2>Update info of :{user.name}</h2>
      <br />
      <form onSubmit={updateUsertoDatabase}>
        <input type="text" name="name" id="" placeholder="name" required />
        <input type="email" name="email" id="" placeholder="email" required />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default UpdateUser;
