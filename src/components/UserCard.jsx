import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const UserCard = ({ user, onUpdate, onDelete }) => {
  const [show, setShow] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [liked, setLiked] = useState(false);

  const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${user.username}&options[mood][]=happy`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    onUpdate(editedUser);
    setShow(false);
  };

  const handleNestedInputChange = (e, field, subField) => {
    const { value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: {
        ...prevUser[field],
        [subField]: value,
      },
    }));
  };

  return (
    <>
      <div className="card">
        <img
          src={avatarUrl}
          className="card-img-top"
          alt={`${user.name}'s avatar`}
        />
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">
            <strong>Email:</strong> {user.email} <br />
            <strong>Phone:</strong> {user.phone} <br />
            <strong>Address:</strong> {user.address.street}, {user.address.city} <br />
            <strong>Company:</strong> {user.company.name} <br />
          </p>
          <div className="d-flex justify-content-between">
            <button
              className={`btn ${liked ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setLiked(!liked)}
            >
              {liked ? "Liked" : "Like 👍🏽"}
            </button>

            <button
              className="btn btn-outline-primary"
              onClick={() => setShow(true)}
            >
              Edit 📝
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={() => onDelete(user.id)}
            >
              Delete 🚮
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Edit Modal with Grid Layout */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Grid Layout with Name and Email in same row */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Phone Field */}
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Address Fields - Street and City in the same row */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    name="street"
                    value={editedUser.address.street}
                    onChange={(e) =>
                      handleNestedInputChange(e, "address", "street")
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={editedUser.address.city}
                    onChange={(e) =>
                      handleNestedInputChange(e, "address", "city")
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Company Field */}
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={editedUser.company.name}
                onChange={(e) =>
                  handleNestedInputChange(e, "company", "name")
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)} size="lg">
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave} size="lg">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserCard;
