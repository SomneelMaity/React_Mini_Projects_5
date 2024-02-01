import React, { useState, useRef, useEffect } from "react";
import "./Modal.css";

const Modal = () => {
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
    let alertMessage = "";

    if (
      !formData.username ||
      !formData.email ||
      !formData.phone ||
      !formData.dob
    ) {
      alertMessage = "Please fill out all fields.";
    } else {
      if (!formData.email.includes("@")) {
        alertMessage = "Invalid email. Please check your email address.";
      } else if (!/^\d{10}$/.test(formData.phone)) {
        alertMessage =
          "Invalid phone number. Please enter a 10-digit phone number.";
      } else {
        const currentDate = new Date();
        const enteredDate = new Date(formData.dob);

        if (enteredDate > currentDate) {
          alertMessage =
            "Invalid date of birth. Date of birth cannot be in the future.";
        }
      }
    }

    if (alertMessage) {
      alert(alertMessage);
    } else {
      // If all validations pass, close the form and reset the form data
      handleCloseForm();
    }
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
            <h2>Fill Details</h2>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
            />

            <label htmlFor="email">Email Address:</label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <label htmlFor="phone">Phone Number:</label>
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
};

export default Modal;
