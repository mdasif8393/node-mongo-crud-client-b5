import React from "react";
import { Link } from "react-router-dom";

const AddUser = () => {
  const addUsertoDatabase = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };

    //send data to server
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("Add a user to database");
          e.target.reset();
        }
      });
  };
  return (
    <div>
      <form onSubmit={addUsertoDatabase}>
        <input type="text" name="name" id="" placeholder="name" required />
        <input type="email" name="email" id="" placeholder="email" required />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddUser;
