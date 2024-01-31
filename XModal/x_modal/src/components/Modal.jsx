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
    // Reset form data on modal close
    setFormData({
      username: "",
      email: "",
      phone: "",
      dob: "",
    });
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
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const currentDate = new Date();
    const enteredDate = new Date(formData.dob);

    if (enteredDate > currentDate) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      return;
    }

    // If all validations pass, close the form and reset the form data
    handleCloseForm();
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="App">
      <button onClick={handleOpenForm}>Open Form</button>

      {isOpen && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            <h2>Form Modal</h2>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />

            <label htmlFor="dob">Date of Birth:</label>
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
        </div>
      )}
    </div>
  );
}
