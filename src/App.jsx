import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";
import LoadingIndicator from "./components/LoadingIndicatoe";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Add User Functionality
  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: "New User",
      username: "newuser",
      email: "newuser@example.com",
      phone: "123-456-7890",
      address: { street: "New Street", city: "New City" },
      company: { name: "New Company" },
    };
    setUsers([newUser, ...users]);
  };

  // Update user functionality
  const handleUpdate = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  // Delete user functionality
  const handleDelete = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  return (
    <>
      {/* Navbar */}
      
        <Container>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          
            {/* Add New User Button in Navbar */}
            <Button 
              variant="outline-light" 
              onClick={handleAddUser} 
              className="ms-3 text-white border border-dark bg-black"> {/* ms-3 adds spacing to the right */}
              + Add New User
            </Button>
        </Container>
      
      {/* Main content */}
      <div className="container mt-5">
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <h1 className="text-center mb-4">User Profile </h1>
            <div className="row">
              {users.map((user) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={user.id}>
                  <UserCard user={user} onUpdate={handleUpdate} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;