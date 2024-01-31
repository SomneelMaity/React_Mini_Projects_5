import React, { useState, useRef, useEffect } from "react";
import "./Modal.css";
export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleCloseForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenForm = () => {
    setIsOpen(true);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (
      !formData.username ||
      !formData.email ||
      !formData.phone ||
      !formData.dob
    ) {
      alert("Please fill out all the fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Invalid email");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Invalid phone number");
      return;
    }

    const currentDate = new Date();
    const enteredDate = new Date(formData.dob);

    if (enteredDate > currentDate) {
      alert("Invalid date of birth");
      return;
    }

    // If all validations pass, reset the form data
    setFormData({
      username: "",
      email: "",
      phone: "",
      dob: "",
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="modal-body">
      <button onClick={handleOpenForm}>Open Form</button>

      {isOpen && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            <h2>Form Modal</h2>
            <label htmlFor="username">
              <strong>Username:</strong>
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
            />

            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <label htmlFor="phone">
              <strong>Phone:</strong>
            </label>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />

            <label htmlFor="dob">
              <strong>Date of Birth:</strong>
            </label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />

            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          {/* <button className="close-button" onClick={handleCloseForm}>
            Close
          </button> */}
        </div>
      )}
    </div>
  );
}
