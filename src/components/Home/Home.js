import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [users]);

  const deleteUser = (_id) => {
    const proceed = window.confirm("Are you sure want to delete?");
    if (proceed) {
      const url = `http://localhost:5000/user/${_id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            const newUsers = users.filter((user) => user._id !== _id);
            setUsers(newUsers);
          }
        });
    }
  };

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            Name: {user.name}::Email: {user.email}::ID: {user._id}{" "}
            <button onClick={() => deleteUser(user._id)}>delete</button>
            <Link to={`/update/${user._id}`}>
              <button>update</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
